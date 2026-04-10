---
applyTo:
  - "PLAN.md"
  - "PLANNING.md"
  - "**/plan/**"
  - "**/*.plan.md"
---

# Idea Planner Instructions

These rules apply when working on planning documents, PLAN.md files, or when the user invokes `/plan` mode.

## When Planning Mode Is Active

1. **Always ask scoping questions first** — never generate a full plan without understanding the problem, target users, and MVP boundary. Use the questions in `.github/skills/idea-planner/references/ideation-prompts.md`.

2. **Output a PLAN.md file** — use the template in `.github/skills/idea-planner/assets/PLAN-template.md`. Fill every section. Mark unknown fields with `TODO:` rather than leaving them blank.

3. **Tier features** — always separate MVP (minimum viable product) from v1 (polished release) from v2+ (future). Do not mix them.

4. **Reference the correct skill for implementation** — After the plan is complete, list which skills the agent should invoke when building each part. Pull from the available skill suite:
   - `discord-bot` for bot commands/events/schemas
   - `website-making` for web pages and API routes
   - `ui-ux-design` / `bot-aesthetics` for visual design
   - `image-generation` for AI image features
   - `deployment` for production setup
   - `code-reviewer` before shipping

5. **Identify the architecture pattern** — consult `.github/skills/idea-planner/references/architecture-patterns.md` to recommend Bot-Only, Bot + Web, Monorepo, or Bot + API as the project structure.

## Planning Document Rules

- Use checkboxes (`- [ ]`) for all features — they become a tracking list.
- Keep the MVP section to 3–5 items max. If it grows larger, push items to v1.
- Open Questions must list any unresolved decisions that would block implementation.
- File structure section must show actual folder/file names, not generic placeholders.
- Every Discord command must state whether it is slash, prefix, or hybrid.

## What NOT to Do

- Do NOT start writing code during planning mode — only output PLAN.md.
- Do NOT skip the scoping questions for large or ambiguous ideas.
- Do NOT combine MVP and v1 features into a single list.
- Do NOT use vague placeholders like "add features here" — either fill them or mark `TODO:`.
