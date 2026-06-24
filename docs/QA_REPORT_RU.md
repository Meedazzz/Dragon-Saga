# QA-отчёт Dragon Saga

Дата проверки: 2026-06-24

## Главное

Сделан реальный прогон интерфейса в виртуальном Chromium через Playwright. Проверка открывает страницы как пользователь: на desktop, tablet и mobile, проверяет изображения, горизонтальные переполнения, Таро, активности, новый лорбук, расширенный бестиарий, военные машины Иллирии и индивидуальные темы героев.

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
41 passed
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
- `/Dragon-Saga/lorebook/faction-legion`
- `/Dragon-Saga/lorebook/illyria-war-machines-doctrine`
- `/Dragon-Saga/lore/valery`
- `/Dragon-Saga/lor`
- `/Dragon-Saga/map/sever`

Проверяется:

- страница открывается;
- нет битых локальных изображений;
- нет горизонтального переполнения;
- на главной есть 5 карточек героев;
- на главной есть 5 карт Таро;
- на активностях есть 7 карточек;
- лорбук показывает 50 новых страниц;
- отдельные страницы лорбука открываются;
- отдельная страница военных машин Иллирии открывается;
- страницы вампиров, нежити и совомедведей открываются;
- поиск по лорбуку работает;
- работает открытие модалки Таро;
- работает кнопка «Показать все» у Таро;
- работает боковое меню;
- работает оракул активностей;
- работает поиск активности;
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

### 7. Бестиарий расширен

Добавлены и проверены новые страницы:

- вампиры;
- големы;
- элементали;
- сельваны;
- общая нежить;
- драугры;
- личи;
- совомедведи.

## Проверенные маршруты через локальный preview

Все вернули `200 OK`:

- `/Dragon-Saga/`
- `/Dragon-Saga/activities`
- `/Dragon-Saga/lorebook`
- `/Dragon-Saga/bestiary`
- `/Dragon-Saga/lorebook/bestiary-werewolves`
- `/Dragon-Saga/lorebook/bestiary-vampires`
- `/Dragon-Saga/lorebook/bestiary-undead-overview`
- `/Dragon-Saga/lorebook/bestiary-owlbears`
- `/Dragon-Saga/lorebook/faction-legion`
- `/Dragon-Saga/lorebook/illyria-war-machines-doctrine`
- `/Dragon-Saga/lorebook/war-scorpions-ballistae`
- `/Dragon-Saga/lorebook/lore-valery-replaced`
- `/Dragon-Saga/lor`
- `/Dragon-Saga/letopis`
- `/Dragon-Saga/lore/valery`
- `/Dragon-Saga/lore/brin`
- `/Dragon-Saga/lore/sakris`
- `/Dragon-Saga/lore/talis`
- `/Dragon-Saga/lore/stive`
- `/Dragon-Saga/map/sever`
- `/Dragon-Saga/map/northwind`
- `/Dragon-Saga/404.html`

## Что всё равно желательно проверить руками после деплоя

Playwright в Chromium проверил основные интерфейсные части. Но Safari/iOS/Android WebView могут отличаться, поэтому после пуша желательно вручную открыть:

1. Safari iPhone
2. Chrome Android
3. Firefox Desktop
4. Chrome Desktop

Минимальный ручной чек:

- главная открывается без пустых карт;
- Таро раскрывается и модалка закрывается;
- `/activities` открывается и оракул бросает карту;
- `/lorebook` открывается и поиск работает;
- `/lorebook/bestiary-vampires` открывается;
- `/lorebook/bestiary-undead-overview` открывается;
- `/lorebook/illyria-war-machines-doctrine` открывается;
- меню не вылезает за экран;
- `/lore/valery` открывается с обновлённым лором после обновления страницы.
