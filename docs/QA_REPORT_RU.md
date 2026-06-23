# QA-отчёт Dragon Saga

Дата проверки: 2026-06-24

## Главное

Удалось сделать реальный прогон интерфейса в виртуальном Chromium через Playwright. Это уже не только проверка кода/маршрутов, а автоматическое открытие страниц в браузере с desktop/tablet/mobile viewport.

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

### Проверка CSS

- Количество `{` и `}` совпадает.
- Убрана ошибочная директива `@tailwind tailwind utilities`.
- Проверено отсутствие плохих путей:
  - `/Dragon-Saga//Dragon-Saga`
  - `url('/ouroboros.png')`
  - двойной BASE у карт Таро

## Реальный UI-прогон через Playwright

Добавлены файлы:

- `playwright.config.ts` — конфиг браузерных тестов.
- `tests/ui-smoke.spec.ts` — smoke-тесты интерфейса.
- `qa-screenshots/home-desktop.png` — референс главной на desktop.
- `qa-screenshots/home-mobile.png` — референс главной на mobile.
- `qa-screenshots/activities-mobile.png` — референс активностей на mobile.

Команда:

```bash
npm run test:ui
```

Результат:

```txt
19 passed
```

### Что проверяет UI-прогон

На разрешениях:

- desktop: `1440x1000`
- tablet: `820x1180`
- mobile: `390x844`

Проверяются страницы:

- `/Dragon-Saga/`
- `/Dragon-Saga/activities`
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
- работает открытие модалки Таро;
- работает кнопка «Показать все» у Таро;
- работает боковое меню;
- работает оракул активностей;
- работает поиск активности;
- у 5 героев разные theme-цвета;
- веер Таро реально раскрыт по X, а не лежит стопкой.

## Найденные и исправленные баги во время UI-прогона

### 1. Lazy images в fullPage screenshot выглядели как битые

Причина: Playwright быстро снимал fullPage, а lazy-изображения ниже экрана ещё не успевали загрузиться.

Исправление:

- главные карты и видео-превью на главной переведены на `loading="eager"`;
- тест дополнительно прокручивает страницу перед проверкой изображений.

### 2. `/activities` открывался не там из-за base URL в тесте

Причина: Vite preview требует `/Dragon-Saga/activities`.

Исправление:

- тесты теперь ходят по полным путям `/Dragon-Saga/...`.

### 3. Карта Таро перехватывала клик внутренними слоями

Причина: `img`, `.tarot-card-inner`, `.tarot-card-face`, `.tarot-card-back` перехватывали pointer events.

Исправление:

- добавлены `pointer-events: none` для внутренних декоративных слоёв карты;
- клик теперь стабильно попадает в `.tarot-fan-card`.

### 4. Веер Таро визуально был слишком сжат

Причина: первоначальная формула через sin давала слабое раскрытие.

Исправление:

- `TarotFan.tsx` теперь считает X-позиции через адаптивный spread;
- Playwright проверяет, что центры карт реально разнесены по X.

### 5. Цвета героев были не полностью индивидуальны

Исправление:

- добавлены отдельные темы `talisTheme` и `stiveTheme`;
- `/lore/valery`, `/lore/brin`, `/lore/sakris`, `/lore/talis`, `/lore/stive` дают 5 разных theme-цветов.

## Проверенные маршруты через локальный preview

Все вернули `200 OK`:

- `/Dragon-Saga/`
- `/Dragon-Saga/activities`
- `/Dragon-Saga/lor`
- `/Dragon-Saga/letopis`
- `/Dragon-Saga/lore/valery`
- `/Dragon-Saga/lore/brin`
- `/Dragon-Saga/lore/sakris`
- `/Dragon-Saga/lore/talis`
- `/Dragon-Saga/lore/stive`
- `/Dragon-Saga/valery`
- `/Dragon-Saga/brin`
- `/Dragon-Saga/sakris`
- `/Dragon-Saga/stive`
- `/Dragon-Saga/talis`
- `/Dragon-Saga/tallis`
- `/Dragon-Saga/subclass/talis`
- `/Dragon-Saga/subclass/tallis`
- `/Dragon-Saga/darkbain`
- `/Dragon-Saga/hessen`
- `/Dragon-Saga/black-ice-research`
- `/Dragon-Saga/berghheim`
- `/Dragon-Saga/arantir`
- `/Dragon-Saga/map/sever`
- `/Dragon-Saga/map/northwind`
- `/Dragon-Saga/optimized/shirt.webp`
- `/Dragon-Saga/optimized/tarot_valery.webp`
- `/Dragon-Saga/optimized/tarot_brin.webp`
- `/Dragon-Saga/optimized/tarot_sakris.webp`
- `/Dragon-Saga/optimized/tarot_tallis.webp`
- `/Dragon-Saga/optimized/tarot_stive.webp`
- `/Dragon-Saga/shirt.png`
- `/Dragon-Saga/tarot_sakris.png`
- `/Dragon-Saga/ouroboros.png`
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
- меню не вылезает за экран;
- `/lore/valery` и `/lore/brin` открываются после обновления страницы.
