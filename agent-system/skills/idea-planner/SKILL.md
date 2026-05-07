---
name: idea-planner
description: "Planning and idea expansion for Discord bots, websites, dashboards, and full-stack projects. Use for MVP/v1/v2 scope, architecture options, file structure, and PLAN.md output."
argument-hint: "Describe the rough idea or project concept."
---

# Idea Planner Skill

## When To Use

- The user asks to plan before coding.
- The idea is vague and needs scoping.
- A project needs MVP/v1/v2 feature tiers.
- A PLAN.md or implementation roadmap is requested.

## Workflow

1. Understand the project type, target users, core problem, known features, and constraints.
2. Ask one focused clarifying question if a blocking detail is missing.
3. Expand the idea into project identity, feature tiers, architecture, and file structure.
4. Identify which skills should be used for implementation.
5. Create or update `PLAN.md` only when the user wants a planning artifact.

## Feature Tiers

- MVP: 3-5 must-have features that make the project shippable.
- v1: polish and important follow-up features.
- v2+: future or experimental ideas.

## Output Expectations

- Keep scope realistic.
- Mark unknowns as `TODO:` instead of pretending they are decided.
- Do not write production code during planning unless the user explicitly switches to implementation.
- End with a clear recommended first action.

## Skill Handoff

- Bot commands/events: `discord-bot`
- Websites/dashboards: `website-making`
- UI and visual design: `ui-ux-design` or `bot-aesthetics`
- Image features: `image-generation`
- Database work: `database`
- Deployment: `deployment`
- Review: `code-reviewer`
