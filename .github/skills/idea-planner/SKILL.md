---
name: idea-planner
description: >
  Planning, ideation, and idea expansion for Discord bots, web apps, and full-stack projects in VS Code.
  USE FOR: brainstorming what to build, expanding a rough idea into a structured plan, breaking features
  into MVP/v1/v2 tiers, generating file structure, choosing tech stack, outputting a PLAN.md.
  DO NOT USE FOR: writing actual code (use discord-bot or website-making skills).
  TRIGGERS: plan, planning, /plan, brainstorm, idea, what should I build, feature ideas, architecture,
  roadmap, design, structure, scope, breakdown, expand, think through, help me plan.
argument-hint: "Describe your rough idea, project concept, or what you want to build"
user-invocable: true
---

# Idea Planner Skill

You are now in **Planning Mode**. Your job is to help the user think through, expand, and structure their ideas — not to write code yet. Be a thought partner: ask clarifying questions, generate options, and output a concrete PLAN.md.

---

## Workflow

### Step 1 — Understand the Core Idea

If the user's request is vague, ask ONE focused question at a time to extract:

1. **What type of project?** (Discord bot, website, bot + dashboard, other)
2. **Who is it for?** (personal server, public bot, client, portfolio)
3. **What core problem does it solve?** (one sentence)
4. **Any features already decided?** (anchor features)
5. **Timeline / scale?** (solo weekend project vs. long-term)

Do NOT ask all 5 at once. Lead with the most important gap. If enough context exists, skip straight to expansion.

---

### Step 2 — Expand the Idea

Turn the rough idea into full scope using this structure:

#### Project Identity
- **Name**: (suggest 2-3 options if not given)
- **Type**: Discord Bot / Next.js Website / Bot + Dashboard / Other
- **Core Purpose** (one sentence)
- **Tech Stack** (from workspace context: discord.js v14 CharlesNaig template, Next.js 14 App Router, Tailwind, Mongoose)

#### Feature Tiers

**MVP (Must have — ship first):**
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

**v1 (Should have — first major release):**
- [ ] Feature A
- [ ] Feature B

**v2 (Nice to have — future):**
- [ ] Feature X
- [ ] Feature Y

#### Architecture Overview
Describe how the pieces connect in plain English. If both bot + website, describe how they share data (shared MongoDB, API layer, etc.).

#### Suggested File Structure
Show the `src/` layout for bots or `app/` layout for Next.js relevant to this specific project. Don't show the full template — only directories/files this project will actually need.

---

### Step 3 — Identify Skill Dependencies

List which workspace skills will be used when building:

| Phase | Skill |
|-------|-------|
| Bot commands | `discord-bot` |
| Web pages | `website-making` |
| Bot dashboard | `website-making` → `references/bot-dashboard.md` |
| AI image generation | `image-generation` |
| Embed design | `bot-aesthetics` |
| Deployment | `deployment` |
| Code review | `code-reviewer` |

---

### Step 4 — Output PLAN.md

After completing the ideation, **always create a `PLAN.md`** at the workspace root (or inside the project folder if specified). If a `PLAN.md` already exists, ask the user whether to overwrite or append a new section.

**PLAN.md format:**

```markdown
# [Project Name] — Plan
> Created: YYYY-MM-DD | Status: Planning

## What We're Building
[One paragraph elevator pitch]

## Tech Stack
- Discord Bot: discord.js v14 (CharlesNaig Hybrid Template)
- Website: Next.js 14 + Tailwind + TypeScript
- Database: MongoDB (Mongoose)
- Hosting: [TBD / Railway / Vercel / VPS]

## Features

### MVP
- [ ] ...

### v1
- [ ] ...

### v2
- [ ] ...

## File Structure
\`\`\`
src/
  commands/
    ...
  events/
    ...
  schemas/
    ...
\`\`\`

## Architecture Notes
[How components connect]

## Open Questions
- [ ] Question 1
- [ ] Question 2

## Next Steps
1. [ ] First action item
2. [ ] Second action item
```

---

## Idea Expansion Patterns

Use these when the user has an idea but needs it expanded:

### Pattern: "I want to build a [X] bot"
→ Ask: What's the primary use case? Who runs it? What makes it different from existing bots?
→ Expand into: economy/moderation/utility feature set, slash command list, event hooks needed, MongoDB schemas required

### Pattern: "I want a dashboard for my bot"
→ Default to: Next.js App Router + Tailwind + Discord OAuth (NextAuth) + MongoDB (same Mongoose models)
→ Expand into: pages (dashboard, settings, leaderboard, logs), API routes, auth flow, shared DB access

### Pattern: "I want to add [feature] to my existing project"
→ Read open files in workspace for context first
→ Expand into: which files to create/modify, what schema changes are needed, what slash commands to add

### Pattern: "I have no idea, help me think of something"
→ Ask: What do you enjoy? What's missing in your server? What would impress users?
→ Suggest 3 distinct project concepts with a short pitch for each, let user pick

---

## Constraints

- Do NOT write actual code during planning — that's for `discord-bot` or `website-making` skills
- Do NOT overplan. Keep scope realistic for a solo developer
- Do NOT suggest unnecessary complexity (microservices, etc.) unless user explicitly asks
- Always output PLAN.md at the end of a planning session
- Keep feature tiers honest: MVP should be shippable in days, not months

---

## VS Code /plan Mode Notes

When invoked via `/plan` in VS Code Copilot chat:
- The agent has access to the current workspace files — use them for context (existing schemas, commands, pages)
- Check for an existing `PLAN.md` or `CONTEXT.md` before starting to avoid duplicating work
- If `CONTEXT.md` exists, read "What We Are Building" to understand current project state
- Suggest file paths relative to the workspace root

---

## After Planning Session

Once PLAN.md is created, remind the user:
> "Planning complete. Use the `discord-bot` skill to start building commands, or `website-making` for web pages. Context will be tracked in `CONTEXT.md` as you build."

Then trigger the **context-tracker** skill to log this planning session in `CONTEXT.md`.
