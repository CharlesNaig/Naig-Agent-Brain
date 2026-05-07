# Project Context

> Auto-updated by the current agent. Last updated: 2026-05-07

---

## What We Are Building

A universal, LLM-agnostic coding agent skill system for Codex, Claude Code, GitHub Copilot, Ollama/local models, OpenCode, and future coding agents. The repository keeps a neutral `agent-system/` source of truth for base rules, skills, context tracking, Obsidian Brain updates, and now includes installer scripts for copying the brain into new projects automatically while preserving `.github/` compatibility adapters for legacy GitHub Copilot workflows.

---

## Session Log

### [2026-05-07] - Added agent brain installer

**What was done:**
- `scripts/install-agent-brain.ps1` - Added the main Windows PowerShell installer that copies Naig Agent Brain into any target project folder.
- `scripts/install-agent-brain.bat` - Added a Command Prompt wrapper for the PowerShell installer.
- `README.md` - Renamed the project heading to `Naig Agent Brain` and documented installer usage, examples, installed files, Obsidian folder detection, and the recommended first agent prompt.
- `.context/2026-05-07-1545-added-agent-brain-installer.md` - Created the local session snapshot for this installer work.
- `.context/obsidian-brain-pending/2026-05-07-1545-added-agent-brain-installer.md` - Created a pending Obsidian Brain entry because this remote GitHub session cannot directly write to the user's local Windows vault.

**Current state:**
- Working: The repo now includes an installer toolkit for copying `AGENTS.md`, `CLAUDE.md`, `agent-system/`, and `.github/copilot-instructions.md` into new projects.
- Working: The installer creates `CONTEXT.md`, `.context/`, a local install snapshot, and either an Obsidian Brain entry or fallback pending brain entry.
- Needs testing: Run the installer locally on Windows against a test folder and confirm the files copy correctly.

**Key decisions:**
- Decision: PowerShell is the primary installer and BAT is only a wrapper.
- Why: PowerShell can safely copy folders, create files, detect project names, update Obsidian folders, and support parameters.
- Decision: Installer defaults to `C:\Users\Charles\Documents\Obsidian Vault\My Brain` but supports `-ObsidianVaultPath` override.
- Why: The user may later move or rename the Obsidian vault.
- Decision: Project detection supports Tambayan, Pinoy Lang, Filipino, Hiraya, portfolio, website, discord-bot, and `_Inbox` fallback.
- Why: These are the user's recurring project categories.

**Verification:**
- Not run: The PowerShell installer was not executed in this remote GitHub environment.
- Manual review: Script syntax and flow were checked while authoring.

**Next steps:**
- [ ] Run `.\scripts\install-agent-brain.ps1 -TargetPath "C:\Users\Charles\Desktop\Projects\Test-Agent-Brain"` locally.
- [ ] Confirm the target project receives the expected files.
- [ ] Confirm the Obsidian Brain entry and `Project Index.md` are created or updated.

---

### [2026-05-07] - Universal agent system refactor

**What was done:**
- `AGENTS.md` - Created the strict universal root entry point that tells every coding agent which base files and skills to read and which context files to update after edits.
- `CLAUDE.md` - Added a root Claude Code compatibility entry that points back to the universal system.
- `README.md` - Rewrote the repository overview around the universal skill system, supported agents, context tracking, Obsidian Brain workflow, and extension instructions.
- `agent-system/README.md` - Added neutral system documentation and required read order.
- `agent-system/base/*` - Added global rules, base skill index, code-quality rules, local context protocol, and Obsidian Brain protocol.
- `agent-system/adapters/*` - Added Codex, Claude Code, GitHub Copilot, OpenCode, and Ollama/local model adapters.
- `agent-system/skills/*/SKILL.md` - Added neutral source-of-truth skills for code review, context tracking, Obsidian Brain, Discord bot work, websites, UI/UX, bot aesthetics, image generation, database, environment config, deployment, idea planning, and deep planning.
- `agent-system/templates/*` - Added reusable templates for local context entries, Obsidian Brain entries, and project indexes.
- `.github/copilot-instructions.md` - Replaced the old Copilot-specific prompt with a GitHub Copilot compatibility adapter.
- `.github/instructions/*.instructions.md` - Replaced legacy instruction bodies with adapters pointing to the neutral base files and skills.
- `.github/skills/*/SKILL.md` - Replaced legacy skill bodies with compatibility wrappers pointing to `/agent-system/skills/`.
- `.github/skills/idea-planner/assets/PLAN-template.md` - Neutralized remaining Copilot-specific template wording.
- `.context/2026-05-07-1517-universal-agent-system-refactor.md` - Created the new local session snapshot under the root `.context/` archive.
- `C:\Users\Charles\Documents\Obsidian Vault\My Brain\_Inbox\Brain Changes\2026-05-07-1517-universal-agent-system-refactor.md` - Created the global Obsidian Brain session entry.
- `C:\Users\Charles\Documents\Obsidian Vault\My Brain\_Inbox\Project Index.md` - Created the `_Inbox` project index and linked the new brain entry.

**Current state:**
- Working: Neutral base system, agent adapters, skill files, templates, and `.github/` compatibility wrappers are in place.
- Not yet working: Nothing known from the markdown refactor itself.
- Needs testing: Actual behavior inside each supported external agent client should be verified during future sessions.

**Key decisions:**
- Decision: `agent-system/` is now the source of truth and `.github/` is compatibility-only.
- Why: Codex, Claude Code, OpenCode, Ollama/local models, and future agents may not treat `.github/` as their primary instruction source.
- Decision: New snapshots go to `.context/`; `.github/.context/` remains legacy.
- Why: Context tracking should not depend on GitHub-specific folder conventions.
- Decision: This repo's Obsidian Brain target is `_Inbox` unless the user later creates a more specific project folder.
- Why: The repo is a general agent skill system, not one of the named Discord bot or website projects.

**Verification:**
- Ran: Inspected key new files, listed `agent-system/`, checked `.github` wrapper structure, and searched for obsolete Copilot/Claude-only wording.
- Not run: Automated tests were not run because this repository change is markdown instruction content only.

**Next steps:**
- [ ] Test each adapter in its target agent client.
- [ ] Consider migrating legacy `.github/skills/*/references` and `assets` into `agent-system/skills/` if those examples should also become neutral source-of-truth assets.

---

### [2026-04-22] — Multi-agent suite created (10 `.agent.md` files)

**What was done:**
- Created 10 specialized Copilot agent files at `C:\Users\Charles\AppData\Roaming\Code\User\prompts\`
- `delegator.agent.md` — orchestrator; the only agent with the `agent` tool; routes tasks to sub-agents
- `architect.agent.md` — system design, file structure, tech stack decisions
- `analyzer.agent.md` — deep codebase analysis, pattern detection, dependency tracing
- `debugger.agent.md` — root-cause debugging, error trace analysis, fix proposals
- `test-gen.agent.md` — unit/integration test generation for bot commands and web routes
- `refactor.agent.md` — safe refactoring, DRY improvements, naming cleanup
- `security.agent.md` — OWASP Top 10 audits, secret scanning, input validation
- `database.agent.md` — Mongoose schema design, query optimization, Prisma migrations
- `api-builder.agent.md` — REST/tRPC API scaffolding, Express/Next.js route generation
- `decomposer.agent.md` — breaks large features into small actionable sub-tasks
- Every agent outputs a **HANDOFF BLOCK** at the end of each response
- Sub-agents have no `agent` tool; only `delegator` can spawn agents

**Files changed:**
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\delegator.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\architect.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\analyzer.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\debugger.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\test-gen.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\refactor.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\security.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\database.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\api-builder.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\decomposer.agent.md` (created)

**Current state:**
- All 10 agents: ✅ created and saved to user prompts folder (cross-workspace)
- Protected files untouched: `Multi-Agents.agent.md`, `ultraplan.agent.md`, `ultraplan.prompt.md`, `plan-componentsV2Migration.prompt.md`, `plan-guildSystemImprovements.prompt.md`

**Key decisions:**
- `delegator` is the single entry point for multi-step tasks; it owns the `agent` tool
- All agents use YAML frontmatter with `name`, `description`, `tools`, `model`, `argument-hint`
- Handoff block format standardized across all agents for chaining context

**Next steps:**
- Test each agent via `@architect`, `@debugger`, etc. in Copilot Chat
- Create context snapshot in `.github/.context/`

---

### [2026-04-10] — UltraPlan agent created (replaces /plan)

**What was done:**
- Created `ultraplan.agent.md` at user prompts folder — deep-thinking planner with 3-pass reasoning, clarifying questions, trade-off analysis, phased roadmaps
- Created `plan.prompt.md` at user prompts folder — shadows built-in `/plan`, redirects to ultraplan agent
- Created `ultraplan.prompt.md` at user prompts folder — adds `/ultraplan` as alias
- All files scoped to `C:\Users\Charles\AppData\Roaming\Code\User\prompts\` (cross-workspace, survives extension updates)

**Files changed:**
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\ultraplan.agent.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\plan.prompt.md` (created)
- `C:\Users\Charles\AppData\Roaming\Code\User\prompts\ultraplan.prompt.md` (created)

---

### [2026-04-09] — idea-planner skill created

**What was done:**
- Created full idea-planner skill suite (5 files)
- Supports VS Code /plan mode, /plan trigger phrases, brainstorming, ideation
- Tiered feature generation: MVP → v1 → v2+
- Outputs PLAN.md using PLAN-template.md
- New instruction file: `idea-planner.instructions.md` (applyTo: PLAN.md, PLANNING.md, **/plan/**)
- Created session snapshot: `.github/.context/2026-04-09-idea-planner-skill.md`
- idea-planner: ✅ fully operational

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
