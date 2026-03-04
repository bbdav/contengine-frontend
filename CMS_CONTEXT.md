# CMS (contengine-frontend) — Context

This file captures the key project/context so we don’t rely on chat history.

## Repo
- Local path: `~/Documents/GitHub/contengine-frontend`
- Remote: `https://github.com/bbdav/contengine-frontend.git`

## Stack
- React 19 + TypeScript
- Vite (build: `tsc -b && vite build`)
- Tailwind CSS v4
- React Aria / react-aria-components (tables, selection, etc.)
- Untitled UI-style component kit (local components + tokens)
  - Icons: `@untitledui/icons`
  - File icons: `@untitledui/file-icons`
  - Additional icons: `@phosphor-icons/react`

## Tokens / styling conventions
- Tokens CSS is generated via: `npm run tokens:build` (runs predev/prebuild)
- Common rounding guidance used in the UI work:
  - `rounded-lg` ≈ 8px (preferred for “md” controls)
  - avoid ad-hoc `rounded-xl` unless explicitly in design

## Key UI layout pieces
### Content page layout wrapper
- Component: `src/components/layouts/ContentPageLayout.tsx`
- Used by pages like `src/pages/ArticlesPage.tsx`
- Top bar spec we implemented earlier:
  - height: `h-[60px]`
  - border bottom: `border-b border-secondary`
  - breadcrumbs container padded `px-6 py-3` (24x12)
  - right-side actions padded consistently

### Sidebar / navigation
- There is a sidebar implementation under `src/components/sidebar/Sidebar.tsx`
- There are also “app navigation” components under:
  - `src/components/application/app-navigation/...`
  - Notable base: `src/components/application/app-navigation/base-components/nav-item.tsx`
- A previous requirement: default nav items should be **transparent** (no `bg-primary` on default), with hover/selected backgrounds applied explicitly.

## “Article” page that exists
### Page
- `src/pages/ArticlesPage.tsx`

### What it contains (high-level)
- Breadcrumbs: `Content > Collections > Article`
- Header: title “Article”, subtitle “7 entries found”, primary action “Create new entry”
- Controls row: Search input, date range, Filters button (with count), columns utility button, language dropdown
- Table: `src/components/application/table/table` with multi-select

### Status column badges
- Status values used:
  - `Draft`, `In Review`, `Ready to Publish`, `Published`, `Revision required`
- There was a refactor from a custom `<StatusPill />` span to using the shared Badge components (plus icons), then build/commit.

## Useful commands
```bash
cd ~/Documents/GitHub/contengine-frontend
npm install
npm run dev
npm run build
```

## Notes / next work
- Goal: use Figma frames to implement additional CMS pages faster + pixel-perfect.
- For new pages, prefer reusing `ContentPageLayout` + existing base components (Button, Input, Badge, Table, Dropdown, etc.) and keep sizing consistent.
