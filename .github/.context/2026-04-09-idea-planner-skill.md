# Session Snapshot — idea-planner Skill Complete

**Date:** 2026-04-09  
**Session Slug:** idea-planner-skill

## What Was Done

Created the full `idea-planner` skill suite for VS Code `/plan` mode:

- `.github/skills/idea-planner/SKILL.md` — skill definition, trigger phrases, planning procedure
- `.github/skills/idea-planner/references/ideation-prompts.md` — scoping questions, feature tier framework, user story format
- `.github/skills/idea-planner/references/architecture-patterns.md` — Bot-Only / Bot+Web / Monorepo / Bot+API patterns, CharlesNaig integration points, feature combo table
- `.github/skills/idea-planner/assets/PLAN-template.md` — full PLAN.md output template (overview, problem, users, MVP, v1, v2+, stack, file structure, commands, schemas, skills needed, open questions)
- `.github/instructions/idea-planner.instructions.md` — applyTo PLAN.md, PLANNING.md, **/plan/**, enforces scoping questions, tiered features, skill references

## Skill Behavior

- Triggers on: "plan", "/plan", "planning mode", "brainstorm", "ideate", "expand this idea"
- Asks scoping questions before generating anything
- Outputs a filled PLAN.md based on PLAN-template.md
- Recommends architecture pattern from architecture-patterns.md
- Lists which skills to invoke for implementation

## Files Changed

```
CREATED .github/skills/idea-planner/SKILL.md
CREATED .github/skills/idea-planner/references/ideation-prompts.md
CREATED .github/skills/idea-planner/references/architecture-patterns.md
CREATED .github/skills/idea-planner/assets/PLAN-template.md
CREATED .github/instructions/idea-planner.instructions.md
```
