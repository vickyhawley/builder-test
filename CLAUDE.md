@AGENTS.md
# CLAUDE.md — Claude Code guide for builder-test

## Project
Next.js App Router, TypeScript strict, Tailwind CSS.
No `src/` folder — app code lives in `app/`.

## Component library
UI primitives live in `app/components/ui/`:
- `Button.tsx` — variants: primary | secondary | ghost | danger. Sizes: sm | md | lg. Has loading state.
- `Card.tsx` — exports Card, CardHeader, CardFooter, CardDivider.
- `Badge.tsx` — variants: default | success | warning | danger | info | outline. Has dot prop.
- `Input.tsx` — has label, hint, error, leadingIcon, trailingIcon props. Handles aria automatically.
- `index.ts` — barrel export, import from `app/components/ui`

**Always check here before creating new primitives.** If Button, Card, Input, or Badge cover the need — use them.

## Code conventions
- Named exports only (except `app/` pages which use default exports)
- Explicit TypeScript props interfaces on every component — no `any`
- Tailwind utility classes only — no inline styles, no hardcoded colours
- Small focused components — split anything over ~100 lines
- No new packages without flagging in PR description

## File placement
- New UI primitives → `app/components/ui/`
- New feature components → `app/components/[feature-name]/`
- Utility functions → `app/lib/`
- Page routes → `app/[route]/page.tsx`

## Commands (run on the changed file, not the whole project)
```bash
npx tsc --noEmit                          # type check
npx eslint --fix app/path/to/file.tsx     # lint
npx prettier --write app/path/to/file.tsx # format
```

## Do not
- Use `any` — use `unknown` and narrow, or define a proper interface
- Duplicate components that exist in `app/components/ui/`
- Hardcode colours — use Tailwind tokens
- Add `use client` unless the component genuinely needs browser APIs or event handlers