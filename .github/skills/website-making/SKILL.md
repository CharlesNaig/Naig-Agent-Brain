---
name: website-making
description: "Full-stack website development with Next.js 14+ App Router, React 18, Tailwind CSS, TypeScript. Use when: building web pages, landing pages, dashboards, bot dashboards, admin panels, APIs, authentication, database-backed apps, forms, animations, SEO, accessibility, deployment. Triggers: create page, build website, Next.js, React component, Tailwind, web app, landing page, API route, server action, authentication, Prisma, tRPC, dashboard, bot dashboard, frontend, backend, full stack."
argument-hint: "Describe the page or feature (e.g. 'bot dashboard with guild stats and command list')"
---

# Website Making Skill

## When to Use
- Creating new Next.js pages, layouts, components, or API routes
- Building bot dashboards (Discord OAuth2, guild management)
- REST APIs, server actions, tRPC routers
- Authentication flows (NextAuth.js / better-auth)
- Database integration with Prisma
- Animations, transitions, accessibility improvements
- SEO, Open Graph, structured data

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3+ |
| Components | shadcn/ui + Radix UI |
| Animation | Framer Motion |
| Auth | NextAuth.js v5 / better-auth |
| DB ORM | Prisma |
| API | tRPC v11 or Next.js Route Handlers |
| Forms | React Hook Form + Zod |
| State | Zustand (client) or React Query (server state) |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library + Playwright (E2E) |

## Project Structure
```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── callback/route.ts
├── (dashboard)/
│   ├── layout.tsx
│   └── guild/[id]/page.tsx
├── api/
│   └── trpc/[trpc]/route.ts
├── layout.tsx          # Root layout (fonts, providers)
└── page.tsx            # Home / landing page
components/
├── ui/                 # shadcn/ui components
├── layout/             # Header, Sidebar, Footer
└── features/           # Domain-specific components
lib/
├── auth.ts             # NextAuth config
├── db.ts               # Prisma client singleton
└── utils.ts            # cn(), formatters
public/                 # Static assets
styles/
└── globals.css         # Tailwind + CSS vars
```

## Procedure

### 1. New Page
1. Create `app/<route>/page.tsx` as async Server Component by default
2. Add metadata export: `export const metadata: Metadata = { title: '...', description: '...' }`
3. Add loading state: create `app/<route>/loading.tsx` with skeleton
4. Add error boundary: create `app/<route>/error.tsx` with `'use client'`
5. Use `generateStaticParams` for dynamic routes where content is predictable

### 2. New Component
1. Server Component unless it needs: `useState`, `useEffect`, browser APIs, event listeners
2. Add `'use client'` at top only when client interactivity is required
3. Use Tailwind classes; never use inline styles
4. All interactive elements must have ARIA labels or accessible text
5. Use `cn()` utility for conditional classes

### 3. Discord Bot Dashboard
1. Auth via Discord OAuth2 with NextAuth — see [bot dashboard guide](./references/bot-dashboard.md)
2. Fetch guilds where user is admin from Discord API
3. Bot data via internal API route with bot token (server-side only — never expose to client)
4. Real-time updates via Server-Sent Events or polling every 30s
5. Use [dashboard layout template](./assets/dashboard-layout.tsx)

### 4. API Route / Server Action
1. Prefer Server Actions for form mutations
2. Use Route Handlers for external API consumers or webhooks
3. Always validate input with Zod before any DB/external call
4. Return consistent `{ success, data?, error? }` shape
5. Rate limit public endpoints with `next-rate-limit` or Upstash Ratelimit

### 5. Forms
1. Use React Hook Form + Zod resolver
2. Show inline field errors with `{errors.field?.message}`
3. Disable submit button while submitting
4. Show toast notification on success/error (Sonner)

### 6. Styling Guidelines
- Mobile-first: start with base styles, add `sm:`, `md:`, `lg:`, `xl:` prefixes
- Dark mode via `class` strategy — toggle by adding `dark` to `<html>`
- Discord-themed dashboards: use CSS vars matching Discord's dark theme (see [design reference](./references/design-tokens.md))
- Animations: use Framer Motion for enter/exit; Tailwind `transition-*` for hover/focus

## Key Rules
- No `useEffect` for data fetching — use Server Components or React Query
- No `any` type — use proper TypeScript generics
- Images via `next/image` always — never `<img>`
- Fonts via `next/font` — never `<link>` to Google Fonts
- Environment variables: `NEXT_PUBLIC_*` for client, everything else server-only
- Never call bot token APIs from client components

## References
- [Bot Dashboard Setup](./references/bot-dashboard.md)
- [Design Tokens (Discord Theme)](./references/design-tokens.md)
- [Authentication Setup](./references/auth.md)
- [Dashboard Layout Template](./assets/dashboard-layout.tsx)
- [API Route Template](./assets/api-route.ts)
