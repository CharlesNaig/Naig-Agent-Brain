---
name: website-making
description: "Full-stack website development with Next.js, React, Tailwind CSS, TypeScript, dashboards, APIs, authentication, forms, SEO, accessibility, and deployment-ready structure."
argument-hint: "Describe the website page, component, API, or feature."
---

# Website Making Skill

## When To Use

- Creating or modifying Next.js pages, layouts, components, and API routes.
- Building bot dashboards, admin panels, landing pages, and full-stack web apps.
- Working on authentication, forms, SEO, accessibility, and performance.

## Default Stack

| Layer | Choice |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript strict mode |
| Styling | Tailwind CSS |
| Components | shadcn/ui and Radix UI when already used |
| Auth | NextAuth.js or project-selected auth |
| Database | Prisma for website projects when applicable |
| Forms | React Hook Form + Zod when already in stack |

Follow the existing project stack first.

## Next.js Rules

- Server Components by default.
- Add `'use client'` only for browser APIs, state, effects, or DOM events.
- Do not fetch initial server data in `useEffect` when Server Components or route handlers fit.
- Export metadata from pages where the project uses metadata.
- Add loading and error boundaries for meaningful async routes.

## TypeScript Rules

- Avoid `any`.
- Validate external input with schemas or explicit guards.
- Use explicit return types for exported functions when project style expects them.
- Keep server-only secrets out of client components.

## Styling And Accessibility

- Use existing design tokens and Tailwind conventions.
- Use semantic HTML.
- Icon-only controls need accessible names.
- Interactive states need visible focus styles.
- Images should use the framework image component when available.

## API And Server Actions

- Validate all input before database or external calls.
- Return consistent success/error shapes.
- Rate limit public endpoints.
- Do not expose stack traces to clients.

## Bot Dashboard Notes

- Discord OAuth and bot token calls must stay server-side.
- Fetch only guilds the user is allowed to manage.
- Keep guild settings changes auditable and validated.
- Prefer internal APIs or server actions for bot/dashboard integration.
