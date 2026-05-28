## What changed

<!-- Опиши что изменилось -->

## Architecture checklist

- [ ] `page.tsx` не содержит бизнес-логику
- [ ] Код находится в правильном слое (`features/` / `components/` / `lib/`)
- [ ] Нет новых `any` типов
- [ ] Все новые компоненты типизированы через `interface`
- [ ] Использован правильный state management (Server Component / nuqs / Zustand / React Query)
- [ ] Есть loading / error / empty states для async операций
- [ ] Строки через `next-intl` (нет хардкода текста в JSX)
- [ ] Accessibility: `aria-label`, `role`, `htmlFor` для форм
- [ ] Тесты добавлены или обновлены (если применимо)
