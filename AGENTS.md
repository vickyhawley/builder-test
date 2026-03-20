<!-- BEGIN:nextjs-agent-rules -->
# AGENTS.md — AI Coding Agent Guide

> This file tells Builder.io (and any other AI coding agent) exactly how this codebase
> works, so generated code is consistent, safe, and genuinely useful to the team.
> Update this file whenever patterns change.

---

## 🗂 Project Structure

```
app/
├── components/          # Shared UI components — always prefer these over generating new ones
│   ├── ui/              # Base-level primitives (Button, Input, Modal, Badge…)
│   └── [feature]/       # Feature-scoped components
├── hooks/               # Custom React hooks — check here before adding useState logic
├── lib/                 # Utilities, API clients, helpers
├── pages/ (or app/)     # Route-level components
├── styles/              # Global styles, tokens, theme config
└── types/               # Shared TypeScript types and interfaces
```

> ⚠️ **Always check `app/components/ui/` first.** If a primitive (button, card, input, etc.)
> exists there, use it. Do not generate an equivalent from scratch.

---

## ✅ Component Conventions

- **Functional components only** — no class components anywhere in this codebase
- **Named exports** — avoid default exports except for route-level pages
- **Props interfaces** — every component must have an explicit TypeScript props interface
  ```tsx
  // ✅ Correct
  interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }
  export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => { ... }

  // ❌ Avoid
  export default function Button(props: any) { ... }
  ```
- **Small, focused components** — if a component exceeds ~150 lines, split it
- **Co-locate related logic** — keep hooks, types, and styles near the component they serve

---

## 🎨 Styling

- **[REPLACE WITH YOUR APPROACH — e.g. Tailwind / CSS Modules / Styled Components]**
- Use design tokens from `app/styles/tokens` (or equivalent) — never hardcode colours,
  spacing, or font sizes
- For third-party components (e.g. MUI, Radix, Headless UI), extend via the project's
  existing theme/override layer — do not inline override styles
- Match the styling pattern of adjacent components in the same directory

---

## 🔄 State Management

- **[REPLACE WITH YOUR APPROACH — e.g. Zustand / Redux Toolkit / React Query / Context]**
- Check `app/hooks/` for existing data-fetching or state hooks before creating new ones
- Server state (API data) and client state (UI state) must be managed separately
- Do not use raw `useState` for data that comes from the API — use the project's
  established data-fetching pattern

---

## 🟦 TypeScript

- Strict mode is enabled — all generated code must pass `tsc` with zero errors
- No `any` types — use `unknown` and narrow, or define a proper interface
- Reuse types from `app/types/` — don't duplicate type definitions
- Return types must be explicit on all exported functions and components

---

## 🧪 Testing

- New components should include a basic test in `__tests__/` or alongside the component
  as `ComponentName.test.tsx`
- Use the project's existing test utilities and mocks — check `app/test-utils/` or
  equivalent before setting up new ones
- Do not push code that breaks existing tests

---

## ⚡ Commands (run per-file, not project-wide)

```bash
# Type-check a single file
npx tsc --noEmit app/path/to/file.tsx

# Lint a single file
npx eslint --fix app/path/to/file.tsx

# Format a single file
npx prettier --write app/path/to/file.tsx

# Run tests for a single file
npx jest app/path/to/file.test.tsx

# Full build (only when explicitly requested)
npm run build
```

> Run lint, typecheck, and tests on every file you touch before submitting a PR.

---

## 🚫 What NOT to do

- Do not install new npm packages without flagging it in the PR description
- Do not create new utility functions if one already exists in `app/lib/`
- Do not use inline styles — all styling goes through the project's established approach
- Do not hardcode API endpoints — use the client in `app/lib/api/` (or equivalent)
- Do not duplicate components that already exist in `app/components/ui/`
- Do not remove or rename existing exports without checking for usages first

---

## 📐 Examples to follow

| Task              | Reference file to copy the pattern from             |
|-------------------|-----------------------------------------------------|
| New UI primitive  | `app/components/ui/Button.tsx`                      |
| Feature component | `app/components/[closest feature]/`                 |
| Data fetching     | `app/hooks/use[ClosestDataHook].ts`                 |
| Form handling     | `app/components/[closest form component].tsx`       |
| Page layout       | `app/pages/[closest page].tsx`                      |

> **Replace the paths above with real files from your repo before committing this file.**

---

## 📝 Pull Request expectations

- PRs should be small and focused — one feature or fix per PR
- Describe what changed and why in the PR description
- Tag a human reviewer before merging — Builder.io PRs are no different from team PRs

---

*Last updated: [DATE] — owned by [TEAM LEAD NAME]*
<!-- END:nextjs-agent-rules -->
