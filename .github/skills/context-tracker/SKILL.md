---
name: context-tracker
description: "MANDATORY SKILL — At the end of every completed prompt, work session, or task, the agent MUST update CONTEXT.md at the workspace root. This is non-negotiable. The file acts as a persistent Obsidian-style journal giving all future agent sessions full context of what is being built."
argument-hint: "No argument needed — this fires automatically after every completed job"
---

# Context Tracker Skill — MANDATORY POST-WORK STEP

## When This Fires
**After every single completed prompt, task, or work session** — no exceptions.
This is the LAST action of every agent turn that did real work.

Skip ONLY if:
- The user asked a purely conversational/question-only prompt with no file changes
- The agent did nothing but read files and answer a question (no edits, no creates)

## What to Write

The file lives at: **`CONTEXT.md`** (workspace root)

If it doesn't exist → create it.
If it exists → **append** a new session entry — NEVER overwrite the whole file.
Keep the most recent entry at the TOP.

---

## File Format

```markdown
# Project Context

> Auto-updated by GitHub Copilot agent. Last updated: YYYY-MM-DD

---

## What We Are Building

[1–3 sentence description of the overall project. Update when the project direction changes.]

---

## Session Log

### [YYYY-MM-DD] — [Short 5-word title of what was done]

**What was done:**
- Bullet point of each file created or changed
- Mention the key feature/fix/addition

**Current state:**
- What is complete and working
- What is partially done or in progress

**Key decisions made:**
- Any important design/architecture choices made this session

**Next steps / open TODOs:**
- Things left to do or that came up during work

---
```

---

## Update Rules

1. **Date** — always use today's real date (`YYYY-MM-DD`)
2. **Title** — 3–6 words, action-oriented: "Created ban moderation command", "Added economy schema", "Rewrote discord-bot skill"
3. **What was done** — one bullet per meaningful file change. Be specific: `Created .github/skills/discord-bot/assets/command-template.js — JS class command template matching the hybrid bot`
4. **Current state** — snapshot of overall project progress. What's complete, what's next
5. **Key decisions** — capture any "why we did X not Y" choices so future sessions don't re-litigate them
6. **Next steps** — list any TODOs or follow-ups from this session

## Example Entry

```markdown
### [2026-04-09] — Rewrote discord-bot skill for JS template

**What was done:**
- Rewrote `.github/skills/discord-bot/SKILL.md` — aligned with CharlesNaig Hybrid Template (JS not TS, class-based commands, ctx hybrid, triple message format)
- Deleted old TS assets (`command-template.ts`, `event-template.ts`, `schema.prisma`)
- Created `command-template.js`, `event-template.js`, `component-template.js`, `schema-template.js`
- Rewrote `discord-bot.instructions.md` — enforces JS, `class extends Command`, triple format, Mongoose
- Updated `economy.md`, `moderation.md`, `music.md`, `embeds.md` references for hybrid template patterns
- Updated `database.instructions.md` — Mongoose primary, Prisma for website only

**Current state:**
- discord-bot skill: ✅ fully aligned with CharlesNaig Hybrid Template
- website-making skill: ✅ complete (Next.js 14 App Router, dashboard templates)
- code-reviewer skill: ✅ complete
- ui-ux-design skill: ✅ complete
- image-generation skill: ✅ complete
- bot-aesthetics skill: ✅ complete
- deployment skill: ✅ complete
- context-tracker skill: ✅ just created (this session)
- All 6 .instructions.md files: ✅ complete

**Key decisions made:**
- Discord bot template is JS (not TS) — all bot skills/instructions now enforce JavaScript
- Mongoose is the database for bot; Prisma only for Next.js website side
- Triple message format (embed + componentsv2 + message) is mandatory for all bot commands

**Next steps / open TODOs:**
- Add leveling system reference to discord-bot/references/
- Consider creating a ticket system reference
- Bot dashboard in website-making could reference the hybrid bot API
```

---

## Procedure for the Agent

1. Finish all the actual work for the session
2. Read existing `CONTEXT.md` if it exists (to preserve it)
3. Prepend a new session entry with today's date after the `## Session Log` heading
4. Update the **"What We Are Building"** section only if the project direction changed
5. Write/save `CONTEXT.md` at workspace root
6. **Also save a copy** of this session's entry alone to `.github/.context/YYYY-MM-DD-<short-slug>.md` — this acts as an individual snapshot archive

**The context file is a living document — treat it like a captain's log. Every session adds an entry.**

## Context Snapshot Archive (`.github/.context/`)

In addition to updating `CONTEXT.md`, save every session entry as a standalone file:

```
.github/
└── .context/
    ├── 2026-04-09-initial-skill-suite.md
    ├── 2026-04-09-discord-bot-hybrid-rewrite.md
    ├── 2026-04-09-context-tracker-created.md
    └── YYYY-MM-DD-short-slug.md   ← one per session
```

File content = just the single session entry block (no full CONTEXT.md header needed).
This gives a clean, git-diffable history of every agent session.
