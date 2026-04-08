# Project Context

> Auto-updated by GitHub Copilot. Last updated: 2026-04-09

---

## What We Are Building

A GitHub Copilot (Claude Sonnet 4.6) agent customization workspace — a full skill and instruction suite for developing Discord bots with the [CharlesNaig Hybrid Template](https://github.com/CharlesNaig/Discord.js-v14-Hybrid-Template-Bot) and Next.js websites. The goal is to give the Copilot agent deep, template-specific knowledge so it generates code that matches existing conventions exactly rather than generic discord.js patterns.

---

## Session Log

### [2026-04-09] — Context tracker first live test

**What was done:**
- Synced `.github/skills/context-tracker/SKILL.md` — added `.github/.context/` snapshot archive step to agent procedure
- Synced `.github/instructions/context-tracking.instructions.md` — added snapshot archive rule matching user's addition to `copilot-instructions.md`
- Created `.github/.context/2026-04-09-context-tracker-live-test.md` — first snapshot entry proving the system works

**Current state:**
- context-tracker skill: ✅ fully operational, live tested
- `.github/.context/` snapshot archive: ✅ created and working
- `CONTEXT.md` running log: ✅ being updated correctly
- All 7 skills + 7 instructions: ✅ complete and consistent

**Key decisions:**
- User manually added `.github\.context` folder rule to `copilot-instructions.md` — synced into skill and instruction so all 3 sources agree
- Two outputs per session: entry prepended to `CONTEXT.md` + standalone snapshot in `.github/.context/YYYY-MM-DD-slug.md`

**Next steps:**
- Context system is fully live — no further setup needed
- Future sessions will auto-generate both outputs

---

### [2026-04-09] — Created context-tracker mandatory skill

**What was done:**
- Created `.github/skills/context-tracker/SKILL.md` — full Obsidian-style captain's log skill, defines format, update rules, example entry, agent procedure
- Created `.github/instructions/context-tracking.instructions.md` — global `applyTo: ["**"]` instruction enforcing CONTEXT.md update at end of every session
- Updated `.github/copilot-instructions.md` — added MANDATORY Context Tracking section to Agent Behavior

**Current state:**
- context-tracker skill: ✅ complete and mandatory
- discord-bot skill: ✅ fully aligned with CharlesNaig Hybrid Template (JS class-based)
- website-making skill: ✅ complete (Next.js 14 App Router, dashboard layout, design tokens, bot dashboard OAuth2)
- code-reviewer skill: ✅ complete (security, performance, Discord-specific anti-patterns)
- ui-ux-design skill: ✅ complete (embed design, color psychology, glassmorphism, animations)
- image-generation skill: ✅ complete (HF MCP tools, Replicate, NSFW filter, prompt templates)
- bot-aesthetics skill: ✅ complete (rank cards with canvas, level-up embeds, seasonal themes, status rotation)
- deployment skill: ✅ complete (PM2, Docker, GitHub Actions, Railway/Vercel, production migrations)
- All 7 `.instructions.md` files: ✅ complete

**Key decisions:**
- Discord bot is JavaScript (ES Modules), NOT TypeScript — the hybrid template is a JS project
- Bot commands use `class extends Command` with `run(ctx, args)` — not `data`/`execute` exports
- Every command must build all 3 message formats: embed + componentsv2 + message (guild-configurable)
- Database is Mongoose for bot; Prisma only for the Next.js website side
- Context file lives at workspace root `CONTEXT.md`, newest entries prepended at top

**Next steps:**
- Add a leveling/XP system reference to `discord-bot/references/`
- Add a ticket system reference
- Consider a `bot-features` skill for common bot feature recipes (giveaways, polls, reaction roles)
- CONTEXT.md will auto-update from this point forward at the end of every session

---

### [2026-04-09] — Rewrote discord-bot skill for CharlesNaig Hybrid Template

**What was done:**
- Rewrote `.github/skills/discord-bot/SKILL.md` — fully aligned with the CharlesNaig Hybrid Template (JS not TS, class-based commands, Context (ctx) hybrid abstraction, triple message format, Mongoose)
- Deleted old TS assets: `command-template.ts`, `event-template.ts`, `schema.prisma`
- Created `.github/skills/discord-bot/assets/command-template.js` — full class with all 3 format sections
- Created `.github/skills/discord-bot/assets/event-template.js` — `class extends Event` pattern
- Created `.github/skills/discord-bot/assets/component-template.js` — `class extends ComponentHandler` with ownership check
- Created `.github/skills/discord-bot/assets/schema-template.js` — Mongoose schema with `models.X || model()` pattern
- Rewrote `.github/instructions/discord-bot.instructions.md` — enforces JS, class pattern, triple format, Mongoose, blocks TS/Prisma anti-patterns
- Rewrote `discord-bot/references/embeds.md` — uses `this.client.embed()`, resolveColor, MessageBuilder
- Rewrote `discord-bot/references/moderation.md` — mirrors Ban.js pattern with Mongoose Warning schema
- Rewrote `discord-bot/references/economy.md` — Mongoose findOneAndUpdate, $inc, session transactions
- Rewrote `discord-bot/references/music.md` — Shoukaku in BotClient, queue as Map, JS-based
- Updated `.github/instructions/database.instructions.md` — Mongoose primary (bot), Prisma for website only
- Updated `.github/instructions/code-quality.instructions.md` — JS for bot src/, TS for website
- Updated `.github/instructions/environment-config.instructions.md` — hybrid template's config.js pattern + .env.example format

**Current state:**
- All discord-bot assets match the actual CharlesNaig Hybrid Template repo
- Old TypeScript-biased content removed throughout

**Key decisions:**
- Read the actual template source files from GitHub before rewriting — ensures 100% accuracy
- Kept Bot template in JS; only website stack uses TypeScript

---

### [2026-04-09] — Initial skill suite creation

**What was done:**
- Created `.github/skills/discord-bot/SKILL.md` (initial version, later replaced)
- Created `.github/skills/website-making/SKILL.md` + assets + references
- Created `.github/skills/code-reviewer/SKILL.md` + security + performance references
- Created `.github/skills/ui-ux-design/SKILL.md`
- Created `.github/skills/image-generation/SKILL.md` + prompts reference
- Created `.github/skills/bot-aesthetics/SKILL.md`
- Created `.github/skills/deployment/SKILL.md`
- Created `.github/instructions/discord-bot.instructions.md`
- Created `.github/instructions/website.instructions.md`
- Created `.github/instructions/code-quality.instructions.md`
- Created `.github/instructions/embed-design.instructions.md`
- Created `.github/instructions/environment-config.instructions.md`
- Created `.github/instructions/database.instructions.md`
- Created `.github/copilot-instructions.md`

**Current state at end of session:**
- Full skill suite scaffolded from scratch (nothing pre-existed in workspace)
- Initial versions based on generic discord.js/TS patterns — later corrected to hybrid template

**Key decisions:**
- Used 7 domain skills + 6 always-on instruction files architecture
- Instructions use `applyTo` glob patterns to auto-apply to matching file types
- Skills use `argument-hint` for better Copilot invocation UX
