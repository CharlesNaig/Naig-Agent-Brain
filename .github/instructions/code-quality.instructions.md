---
description: "Use when writing or reviewing any TypeScript or JavaScript code across Discord bot or web projects. Enforces code quality, naming conventions, error handling, DRY principles, and maintainability standards."
applyTo: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
---

# Code Quality Rules

## Language

- **Discord bot files** (`src/`) — JavaScript (ES Modules). No TypeScript.
- **Website files** (`app/`, `components/`) — TypeScript strict mode. No `any`.
- In JS bot files: use JSDoc `/** @param {BotClient} client */` for type hints
- In TS website files: no `any`, explicit return types, `interface` for shapes

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Variables & functions | camelCase | `getUserBalance`, `isLoading` |
| Classes | PascalCase | `EconomyService` |
| Constants | SCREAMING_SNAKE | `MAX_BALANCE`, `COOLDOWN_MS` |
| Types & Interfaces | PascalCase | `GuildSettings`, `CommandOptions` |
| Files (components) | PascalCase | `ProfileCard.tsx` |
| Files (utils/services) | kebab-case | `economy-service.ts` |
| Discord command names | kebab-case | `give-coins`, `user-info` |
| Env vars | SCREAMING_SNAKE | `DISCORD_BOT_TOKEN` |

## Function Rules

- Max 40 lines per function — extract helpers if longer
- Single responsibility: one function does one thing
- No more than 3 parameters — use an options object for more
- Pure functions where possible — no hidden side effects
- Never return `undefined` and `null` both — pick one for "no value"

## Error Handling

- All `async` functions that can fail MUST have `try/catch`
- Never swallow errors silently: always log or re-throw
- Use typed error classes for domain errors: `class NotEnoughBalanceError extends Error {}`
- User-facing errors must be human-readable — not stack traces

## Anti-Patterns

- **Magic numbers**: no `setTimeout(fn, 86400000)` → use `const ONE_DAY_MS = 86_400_000`
- **Magic strings**: no `if (status === 'ban')` → use enum `ModerationAction.Ban`
- **DRY violations**: if you copy code more than twice, extract a helper
- **God objects**: objects/classes with 20+ methods → split into domain services
- **Callback hell**: no `.then().then().then()` chains → use `async/await`
- **Boolean trap**: `setMode(true, false, true)` → use named options `{ strict: true, cached: false }`

## Comments

- Comments explain WHY, not WHAT — the code explains what
- JSDoc on all exported public functions and classes
- No commented-out dead code — delete it (version control exists)
- TODO comments MUST include a ticket/issue reference: `// TODO(#42): implement retry`

## Imports

- Group imports: 1) Node built-ins 2) External packages 3) Internal paths
- Use path aliases (`@/lib/...`) — never `../../../` more than 2 levels deep
- Named exports only — no default exports except for Next.js pages and layouts
- Tree-shake: import only what you need from large packages

## File Organization

- One class/service per file
- Co-locate tests with source: `economy.service.test.ts` next to `economy.service.ts`
- Index barrel files only where it improves ergonomics — not for every folder
