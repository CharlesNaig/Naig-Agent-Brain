# Architecture Patterns — Discord Bot + Web Projects

## Pattern 1: Bot-Only (Simplest)

```
project/
├── src/
│   ├── commands/
│   ├── events/
│   ├── schemas/
│   └── structures/
├── .env
└── package.json
```

**Use when:** Discord-only features, no web UI needed, self-contained bot.

---

## Pattern 2: Bot + Separate Website (Recommended for Dashboards)

```
root/
├── bot/               ← Discord bot (CharlesNaig template)
│   ├── src/
│   └── package.json
├── web/               ← Next.js 14 App Router
│   ├── app/
│   └── package.json
└── README.md
```

**Use when:** Bot has a web dashboard, user profiles, or admin panel.  
**Database:** Shared MongoDB instance — both bot and web point to same MONGO_URL.  
**Auth:** Discord OAuth2 in Next.js (`next-auth` with Discord provider).

---

## Pattern 3: Monorepo (Turborepo / pnpm workspaces)

```
root/
├── apps/
│   ├── bot/
│   └── web/
├── packages/
│   ├── shared-types/   ← TypeScript types shared between bot and web
│   └── db/             ← Shared Mongoose/Prisma models
├── turbo.json
└── package.json
```

**Use when:** Shared types between bot and web, CI/CD across both, larger team.  
**Caution:** Adds complexity. Only use if shared code is substantial (>3 shared schemas).

---

## Pattern 4: Bot + REST API (Decoupled)

```
root/
├── bot/               ← Discord bot
├── api/               ← Express + Prisma REST API
└── web/               ← Next.js consuming the API
```

**Use when:** Web dashboard must work independently of the bot process, or third-party apps need the API.

---

## CharlesNaig Template Integration Points

| Feature | Where It Lives | Pattern |
|---|---|---|
| Commands | `src/commands/<category>/CommandName.js` | Class extends Command |
| Events | `src/events/<category>/EventName.js` | Class extends Event |
| Database models | `src/schemas/ModelName.js` | Mongoose + `models.X \|\| model()` |
| Shared config | `src/config.js` | Flat export object |
| Bot entry | `src/index.js` | `new BotClient()` |
| Web auth | `app/api/auth/[...nextauth]/route.ts` | Discord OAuth2 |
| Web DB access | `lib/db.ts` → Prisma or Mongoose | Direct or via API |

---

## Decision Tree: What Stack Does This Idea Need?

```
Is it Discord-only? 
  YES → Bot-only (Pattern 1)
  NO ↓

Does it need a web UI?
  NO → Bot + API (optional)
  YES ↓

Is it an admin dashboard or user profile page?
  YES → Bot + Web (Pattern 2)
  
Does it share data models heavily between bot and web?
  YES → Monorepo (Pattern 3)
  NO → Bot + Separate Website (Pattern 2)
```

---

## Common Feature Combos

| Feature | Bot Component | Web Component |
|---|---|---|
| Economy system | `/balance`, `/transfer` commands | Dashboard: user balances, leaderboard |
| Leveling system | XP event handler, `/rank` embed | Profile page, global leaderboard |
| Moderation | `/warn`, `/ban`, `/mute` commands | Audit log viewer, ban management |
| Ticket system | `TicketCreate` button handler | Admin ticket dashboard |
| Role shop | `/buy` command, config schema | Admin item configuration page |
| Music bot | `/play`, `/queue`, Shoukaku | Now-playing widget |
