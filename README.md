# Dragon Saga — Обновление сайта (ИСПРАВЛЕННАЯ ВЕРСИЯ)

## Исправленные ошибки сборки

| Ошибка | Исправление |
|--------|-------------|
| `Cannot find module '@/pages/TallisSubclassPage'` | Исправлено имя файла на `TalisSubclassPage` |
| `'useEffect' is declared but never read` | Удалён неиспользуемый импорт |
| `'useCallback' is declared but never read` | Удалён неиспользуемый импорт |
| `'isFlipped' is declared but never read` | Удалена неиспользуемая переменная |
| `Property 'description' does not exist` | Заменено на `desc` (из CharacterConfig) |
| `'Map' is declared but never read` | Удалён неиспользуемый импорт |
| `'Brain' is declared but never read` | Удалён неиспользуемый импорт |
| `activitiesTheme` not exported | Заменено на `homeTheme` |
| `'activeSection' is declared but never read` | Удалена неиспользуемая переменная |

## Установка

1. Распакуйте архив в корень проекта
2. `npm install` (если нужно)
3. `npm run build` — должно собраться без ошибок
4. `npm run dev` — для разработки

## Что изменилось

- **TarotFan.tsx** — 3D веер карт с переворотом и прокруткой
- **LoadingScreen.tsx** — центрирование по центру экрана
- **HomePage.tsx** — облегчённый дизайн
- **ActivitiesPage.tsx** — 8 инструментов с поиском
- **index.css** — стили 3D карт, адаптивность
- **App.tsx** — обновлённые импорты
