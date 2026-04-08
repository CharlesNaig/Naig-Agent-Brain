---
description: "Use when writing, editing, or reviewing Next.js, React, or TypeScript web files — pages, components, API routes, server actions, layouts. Enforces App Router patterns, TypeScript standards, accessibility, performance, and security."
applyTo: ["app/**", "components/**", "lib/**", "pages/**", "*.tsx", "*.ts"]
---

# Website Coding Rules

## Next.js App Router

- Pages and layouts are Server Components by default — only add `'use client'` when needed  
- Reasons to use `'use client'`: `useState`, `useEffect`, browser APIs, DOM event listeners, Framer Motion
- Never fetch data with `useEffect` in Client Components — use RSC or React Query
- Always export `metadata` from page files: `export const metadata: Metadata = { title: '', description: '' }`
- For dynamic routes use `generateStaticParams` when content is known at build time
- Use `loading.tsx` for Suspense boundaries, `error.tsx` for error boundaries

## TypeScript

- No `any` — use `unknown` + type guards, or proper generic types
- Non-null assertions `!` must be justified with a comment
- Return types required on all exported functions
- Zod schemas for all external/user data at API boundaries: `schema.safeParse(data)`

## Images & Fonts

- ALWAYS use `next/image` — NEVER `<img>` directly
- ALWAYS use `next/font` (google or local) — NEVER `<link>` to Google Fonts
- Provide `width` + `height` OR use `fill` with a relative-positioned container
- Add meaningful `alt` text — not empty unless decorative (then `alt=""` + `aria-hidden`)

## Styling

- Use Tailwind CSS exclusively — no inline `style={{}}` unless absolutely necessary
- Use `cn()` utility for conditional classes (from `clsx` + `tailwind-merge`)
- Mobile-first: write base (mobile) styles first, then `sm:`, `md:`, `lg:`, `xl:`
- Dark mode via `class` strategy with `dark:` prefix — do not use `prefers-color-scheme` media queries

## Accessibility

- Every form input must have an associated `<label>` or `aria-label`
- Every button/link with only an icon must have `aria-label`
- Interactive elements need visible `:focus-visible` styling
- Color contrast: 4.5:1 minimum for body text, 3:1 for large text
- Use semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`

## API Routes & Server Actions

- Validate ALL input with Zod before touching database or external services
- Return consistent shape: `{ success: boolean, data?: unknown, error?: string }`
- Never expose stack traces or internal errors to client — log server-side, return generic message
- Public API routes MUST have rate limiting
- CSRF protection on all state-mutating routes (POST/PUT/DELETE/PATCH)

## Security

- `NEXT_PUBLIC_` vars are bundled into the client — NEVER put tokens/secrets there
- Bot tokens, DB credentials, and API keys stay server-side only
- Sanitize any user-provided content before rendering to prevent XSS
- Use `next/headers` to set security headers (X-Frame-Options, HSTS, CSP) via `next.config.ts`

## Performance

- No heavy third-party libraries in Client Components — use `dynamic()` imports
- Use Next.js fetch caching: `next: { revalidate: N }` for ISR
- Use `React.Suspense` with meaningful fallbacks for async components
- Avoid unnecessary re-renders — memoize callbacks with `useCallback`, values with `useMemo`

## Forms

- Use React Hook Form + Zod resolver — no uncontrolled inputs with `document.getElementById`
- Disable submit button while submitting: `disabled={isSubmitting}`
- Show inline field errors via `errors.fieldName?.message`
- Show toast (Sonner) on success/error — not just console.log
