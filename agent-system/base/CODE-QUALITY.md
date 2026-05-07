# Code Quality

These rules apply when writing or reviewing JavaScript, TypeScript, Discord bot code, or web code.

## Language Defaults

- Follow the target repository's existing language and style first.
- CharlesNaig Discord bot template files under `src/` use JavaScript ES Modules, not TypeScript.
- Website files under `app/`, `components/`, and `lib/` should use TypeScript strict mode when the project is TypeScript-based.
- In JavaScript bot files, use JSDoc for helpful type hints.
- In TypeScript website files, avoid `any`; use `unknown`, type guards, generics, or explicit interfaces.

## Naming

| Thing | Convention | Example |
|---|---|---|
| Variables and functions | camelCase | `getUserBalance` |
| Classes | PascalCase | `EconomyService` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_BALANCE` |
| Types and interfaces | PascalCase | `GuildSettings` |
| Discord command names | kebab-case | `give-coins` |
| Environment variables | SCREAMING_SNAKE_CASE | `DISCORD_BOT_TOKEN` |

## Functions

- Keep functions focused on one responsibility.
- Extract helpers when a function becomes difficult to scan.
- Prefer options objects over long positional parameter lists.
- Prefer pure functions when practical.
- Do not return both `undefined` and `null` for the same "not found" state.

## Error Handling

- Use `try/catch` around async operations that can fail.
- Never swallow errors silently.
- User-facing errors must be human-readable and must not expose stack traces.
- Discord command errors should use safe bot responses, usually ephemeral for user-only failures.

## Anti-Patterns

- Avoid magic numbers and magic strings; name important constants.
- Avoid copy-paste after the second repetition; extract a helper.
- Avoid god objects and oversized services.
- Prefer `async/await` over long `.then()` chains.
- Avoid boolean-trap APIs like `setMode(true, false, true)`; use named options.

## Imports

- Group imports by built-ins, external packages, and internal modules.
- Keep import paths consistent with the project.
- Use named exports unless the framework or existing project convention expects defaults.
- Import only what is needed from large packages.

## Comments

- Comments should explain why, not restate what the code says.
- Public exported functions/classes should have docs when the project uses them.
- Remove commented-out dead code.
- TODO comments should include enough context to be actionable.
