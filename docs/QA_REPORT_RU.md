# QA-отчёт Dragon Saga

Дата проверки: 2026-06-24

## Главное

Сделан реальный прогон интерфейса в виртуальном Chromium через Playwright. Проверка открывает страницы как пользователь: на desktop, tablet и mobile, проверяет изображения, горизонтальные переполнения, Таро, активности, видео, новый лорбук, расширенный бестиарий, военные машины Иллирии, Палантир, Анаптаниум и индивидуальные темы героев.

## Автоматические проверки

### Сборка и TypeScript

```bash
npm run build
```

Результат: успешно. `dist/` собран, `dist/404.html` создан для GitHub Pages.

### Lint

```bash
npm run lint
```

Результат: успешно.

### Проверка ассетов

```bash
node scripts/asset-smoke-test.mjs
```

Результат: успешно. Главные текстуры, карты, рубашка, ouroboros, аватары, карты мира и thumbnail существуют.

### Проверка целостности изображений

Проверены все PNG/JPG/WebP в `public/` через PIL.

Результат:

```txt
31 изображение открывается нормально
битых файлов: 0
```

### Проверка CSS и путей

- Количество `{` и `}` совпадает.
- Убрана ошибочная директива `@tailwind tailwind utilities`.
- Проверено отсутствие плохих путей:
  - `/Dragon-Saga//Dragon-Saga`
  - `url('/ouroboros.png')`
  - двойной BASE у карт Таро
  - старое написание `Пантир` в лорбуке

## Реальный UI-прогон через Playwright

Файлы:

- `playwright.config.ts` — конфиг браузерных тестов.
- `tests/ui-smoke.spec.ts` — smoke-тесты интерфейса.
- `qa-screenshots/home-desktop.png` — референс главной на desktop.
- `qa-screenshots/home-mobile.png` — референс главной на mobile.
- `qa-screenshots/activities-mobile.png` — референс активностей на mobile.

Команда:

```bash
npm run test:ui
```

Результат последнего прогона:

```txt
54 passed
```

### Что проверяет UI-прогон

На разрешениях:

- desktop: `1440x1000`
- tablet: `820x1180`
- mobile: `390x844`

Проверяются страницы:

- `/Dragon-Saga/`
- `/Dragon-Saga/activities`
- `/Dragon-Saga/lorebook`
- `/Dragon-Saga/lorebook/bestiary-werewolves`
- `/Dragon-Saga/lorebook/bestiary-vampires`
- `/Dragon-Saga/lorebook/bestiary-undead-overview`
- `/Dragon-Saga/lorebook/bestiary-owlbears`
- `/Dragon-Saga/lorebook/bestiary-morgoth-spawn`
- `/Dragon-Saga/lorebook/bestiary-tieflings`
- `/Dragon-Saga/lorebook/bestiary-fiends`
- `/Dragon-Saga/lorebook/magic-anaptanium`
- `/Dragon-Saga/lorebook/faction-legion`
- `/Dragon-Saga/lorebook/illyria-war-machines-doctrine`
- `/Dragon-Saga/lore/valery`
- видео-блок главной: записи, автолента, Shorts
- `/Dragon-Saga/lor`
- `/Dragon-Saga/map/sever`

Проверяется:

- страница открывается;
- нет битых локальных изображений;
- нет горизонтального переполнения;
- на главной есть 5 карточек героев;
- на главной есть 5 карт Таро;
- на активностях есть 7 карточек;
- лорбук показывает 51 страницу;
- отдельные страницы лорбука открываются;
- отдельная страница военных машин Иллирии открывается;
- страницы вампиров, нежити, совомедведей, созданий Моргота, тифлингов, исчадий и анаптаниума открываются;
- поиск по лорбуку работает;
- работает открытие модалки Таро;
- работает кнопка «Показать все» у Таро;
- работает боковое меню;
- работает оракул активностей;
- работает поиск активности;
- работают две записи YouTube с корректными ID и стартовым временем;
- работает автолента канала через uploads-плейлист;
- Shorts вынесены в отдельную категорию;
- у 5 героев разные theme-цвета;
- веер Таро реально раскрыт по X.

## Найденные и исправленные баги во время UI-прогона

### 1. Lazy images в fullPage screenshot выглядели как битые

Причина: Playwright быстро снимал fullPage, а lazy-изображения ниже экрана ещё не успевали загрузиться.

Исправление:

- важные изображения главной переведены на `loading="eager"`;
- тест дополнительно прокручивает страницу перед проверкой изображений.

### 2. `/activities` и другие маршруты требовали правильный base URL

Причина: Vite preview требует `/Dragon-Saga/...`.

Исправление:

- тесты ходят по полным путям `/Dragon-Saga/...`.

### 3. Карта Таро перехватывала клик внутренними слоями

Причина: `img`, `.tarot-card-inner`, `.tarot-card-face`, `.tarot-card-back` перехватывали pointer events.

Исправление:

- добавлены `pointer-events: none` для внутренних декоративных слоёв карты;
- клик стабильно доходит до `.tarot-fan-card`.

### 4. Веер Таро визуально был слишком сжат

Причина: первоначальная формула давала слабое раскрытие.

Исправление:

- `TarotFan.tsx` считает X-позиции через адаптивный spread;
- Playwright проверяет, что центры карт реально разнесены по X.

### 5. Цвета героев были не полностью индивидуальны

Исправление:

- добавлены отдельные темы `talisTheme` и `stiveTheme`;
- `/lore/valery`, `/lore/brin`, `/lore/sakris`, `/lore/talis`, `/lore/stive` дают 5 разных theme-цветов.

### 6. Лорбук и военные машины добавлены как новый независимый слой

Проверено:

- каталог `/lorebook`;
- алиас `/bestiary`;
- отдельные буклеты;
- отдельная графа `Военные машины`;
- страница `Военная доктрина Иллирии`;
- поиск;
- связанные страницы.

### 7. Видео-блок проверен

Добавлено и проверено:

- две реальные записи YouTube;
- модальное воспроизведение на сайте через embed;
- внешняя ссылка на YouTube;
- автолента канала через uploads-плейлист;
- отдельная вкладка Shorts.

### 8. Бестиарий расширен и откорректирован

Добавлены и проверены страницы:

- вампиры;
- големы;
- элементали;
- сельваны;
- общая нежить;
- драугры;
- личи;
- совомедведи;
- создания Моргота;
- порождения Тёмного;
- тифлинги;
- исчадия.

Исправлены/уточнены:

- Валькирии теперь описаны как древние майяр и айнур, осквернённые Тёмным и лишённые воли.
- Чёрный лёд описан как недавно появившаяся северная сила боли и страдания, опасная для младших рас и не поражающая эльфов и дворфов.
- `Пантир` исправлен на `Палантир`, с логикой видящего камня в духе палантиров.
- Добавлен Анаптаниум — антимагический минерал.

## Проверенные маршруты через локальный preview

Все вернули `200 OK`:

- `/Dragon-Saga/`
- `/Dragon-Saga/activities`
- `/Dragon-Saga/lorebook`
- `/Dragon-Saga/bestiary`
- `/Dragon-Saga/lorebook/bestiary-vampires`
- `/Dragon-Saga/lorebook/bestiary-golems`
- `/Dragon-Saga/lorebook/bestiary-elementals`
- `/Dragon-Saga/lorebook/bestiary-selvans`
- `/Dragon-Saga/lorebook/bestiary-undead-overview`
- `/Dragon-Saga/lorebook/bestiary-draugr`
- `/Dragon-Saga/lorebook/bestiary-liches`
- `/Dragon-Saga/lorebook/bestiary-owlbears`
- `/Dragon-Saga/lorebook/bestiary-morgoth-spawn`
- `/Dragon-Saga/lorebook/bestiary-dark-spawn`
- `/Dragon-Saga/lorebook/bestiary-tieflings`
- `/Dragon-Saga/lorebook/bestiary-fiends`
- `/Dragon-Saga/lorebook/magic-anaptanium`
- `/Dragon-Saga/lorebook/illyria-war-machines-doctrine`
- `/Dragon-Saga/lore/valery`
- `/Dragon-Saga/404.html`

## Что всё равно желательно проверить руками после деплоя

Playwright в Chromium проверил основные интерфейсные части. Но Safari/iOS/Android WebView могут отличаться, поэтому после пуша желательно вручную открыть:

1. Safari iPhone
2. Chrome Android
3. Firefox Desktop
4. Chrome Desktop

Минимальный ручной чек:

- главная открывается без пустых карт;
- видео «Часть 1» и «Часть 2» открываются в модальном плеере;
- автолента YouTube отображается во вкладке «Автолента»;
- вкладка Shorts ведёт в Shorts канала;
- Таро раскрывается и модалка закрывается;
- `/activities` открывается и оракул бросает карту;
- `/lorebook` открывается и поиск работает;
- `/lorebook/bestiary-vampires` открывается;
- `/lorebook/bestiary-tieflings` открывается;
- `/lorebook/bestiary-fiends` открывается;
- `/lorebook/magic-anaptanium` открывается;
- `/lorebook/illyria-war-machines-doctrine` открывается;
- меню не вылезает за экран;
- `/lore/valery` открывается с обновлённым лором после обновления страницы.
