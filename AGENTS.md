# AGENTS.md

## Commands

| Command            | What it does                            |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Next.js dev server                      |
| `npm run build`    | Production build                        |
| `npm run start`    | Start production server                 |
| `npm run lint`     | ESLint (flat config)                    |
| `npm run lint:fix` | ESLint with --fix                       |
| `npm run format`   | Prettier on {js,jsx,ts,tsx,json,md,css} |
| `npm run prepare`  | Husky install (runs on npm install)     |

- **No tests exist** — `npm test` is a placeholder.
- **Package manager**: `pnpm` (pnpm-lock.yaml).

## Pre-commit

Husky runs `lint-staged`, which runs `eslint --fix` then `prettier --write` on staged `.js/.jsx/.ts/.tsx` files, and `prettier --write` on `.json/.md/.css`.

## Framework & Build

- **Next.js 16 App Router** (no `/pages` directory).
- **TypeScript** strict mode, path alias `@/*` → `./*`.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js`).
- **ESLint** flat config (`eslint.config.mjs`), uses `eslint-config-next` core-web-vitals + typescript + prettier.
- **MDX** supported (`@next/mdx` + `remark-gfm`). Pages with `.mdx` extension work in `app/`.

## Architecture

- **Entrypoint**: `app/layout.tsx` (RootLayout) → `app/page.tsx` (single-page portfolio homepage).
- **Components**: All under `components/`, re-exported via `components/index.ts`.
- **Context**: `context/LayoutContext.tsx` (scroll, nav, loading state) and `context/HomeContext.tsx`.
- **Lib**: Shared utilities in `lib/` — types, Zod schemas, hooks, data, GSAP config, safe-action client.
- **Works pages**: `/works/[slug]` (dynamic route, MDX content).
- **No middleware**: `proxy.ts` at root is a helper, NOT registered as middleware.

## Key Libraries

- **Animations**: GSAP (with ScrollTrigger, registered at import in `lib/gsap-config.ts`), Locomotive Scroll v5, Lottie, `split-type`.
- **Form**: React Hook Form + Zod + next-safe-action (server action in `app/actions/contact-action.ts`).
- **Contact flow**: Honeypot bot detection (`nameVerify` field) → DOMPurify sanitization → Brevo (Sendinblue) transactional email API.
- **Notifications**: Knock (Knock.js) for Discord webhook on contact form submissions.
- **Theme**: `next-themes` with class-based dark mode.
- **Music player**: Howler.js.
- **Styling utils**: `clsx` + `tailwind-merge` (via `cn()` helper in `lib/common.ts`).

## Environment Variables

Required at runtime (no `.env.example`):

- `NEXT_PUBLIC_WEBSITE_URL` — site URL (defaults to `https://sachinathu.dev`)
- `BREVO_API_KEY` — Brevo (Sendinblue) API key for contact form email

## Design Aesthetics

- **Minimalist & Modern**: Clean layouts with ample whitespace, high-contrast typography, and a "less is more" philosophy.
- **Color Palette**:
  - **Light Mode**: Background `#f5f5f5`, Text `#212121`, Primary `#e91e63` (Pink), Accent `#008080` (Teal).
  - **Dark Mode**: Background `#1e1e1e`, Text `#f5f5f5`.
- **Typography**: Uses `Montserrat` font. Headings are bold/medium (`font-medium`) and oversized (e.g., `heading-1` is `text-6xl` to `text-9xl`).
- **Visual Elements**:
  - **Grid Background**: A light, subtle grid pattern is used across the background.
  - **Border Radius**: Large, pill-shaped buttons (`rounded-full`) and slightly rounded cards/images (`rounded-sm`).
  - **Animations**: Subtle, smooth transitions and reveals. Headings often have a "dot" (`.heading-dot`) with a pulsing animation.
- **UI Components**:
  - Pill-shaped buttons with clear hover states.
  - Sidebar navigation with consistent iconography.
  - High-quality, balanced spacing using Tailwind's standard scales.

## Dev Notes

- `app/layout.tsx` has `<Welcome />` component — comment out during development to skip the intro animation.
- `app/layout.tsx` has scroll-restoration script commented out — uncomment if browser back/forward should reset scroll position.
- Device detection is cookie-based (set in `proxy.ts` pattern, reads via `useMobile()` hook in `lib/hooks.ts`).
