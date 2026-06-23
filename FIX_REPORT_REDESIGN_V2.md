# Dragon Saga — Redesign V2 / Bugfix Report

## Что исправлено

- Убрана ошибка двойного base-path у карт Таро: `/Dragon-Saga//Dragon-Saga/optimized/...`.
- Исправлены пути изображений в `TarotFan.tsx`.
- Убрана абсолютная CSS-ссылка `url('/ouroboros.png')`, которая могла ломаться на GitHub Pages.
- Исправлена Tailwind-директива `@tailwind utilities`.
- Добавлены alias-маршруты для Таллиса:
  - `/talis`
  - `/tallis`
  - `/subclass/talis`
  - `/subclass/tallis`
- Главная страница пересобрана в формате единого codex/universe hub.
- Активности стали рабочими: оракул, связи героев, маршруты, архивные переходы.
- Сохранены fallback-изображения для WebP.

## Проверки

- `npm run build` — успешно.
- `node scripts/asset-smoke-test.mjs` — успешно.
- Проверены маршруты через локальный preview:
  - `/Dragon-Saga/`
  - `/Dragon-Saga/activities`
  - `/Dragon-Saga/lor`
  - `/Dragon-Saga/lore/valery`
  - `/Dragon-Saga/lore/brin`
  - `/Dragon-Saga/talis`
  - `/Dragon-Saga/tallis`
  - `/Dragon-Saga/subclass/talis`
  - `/Dragon-Saga/subclass/tallis`
  - `/Dragon-Saga/map/sever`
- Проверено отсутствие плохих ссылок:
  - `/Dragon-Saga//Dragon-Saga`
  - `url('/ouroboros.png')`

## Как залить

```bash
git add .
git commit -m "Redesign Dragon Saga codex and fix tarot paths"
git push origin main
```
