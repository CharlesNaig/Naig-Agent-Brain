# Base Skills

Skills are reusable instructions that any coding agent can invoke. The source of truth is:

```txt
/agent-system/skills/<skill-name>/SKILL.md
```

## Skill Selection

- Use only the skills relevant to the task.
- Read the selected `SKILL.md` before editing.
- When multiple skills apply, use the smallest set that covers the work.
- Always use `context-tracker` and `obsidian-brain` after a session that changed files.

## Core Skills

| Skill | Use When |
|---|---|
| `code-reviewer` | Reviewing code for bugs, security, performance, maintainability, accessibility, or Discord-specific issues. |
| `context-tracker` | Updating `CONTEXT.md` and local `.context/` snapshots after file changes. |
| `obsidian-brain` | Writing long-term global memory entries into the user's Obsidian vault. |
| `discord-bot` | Building or reviewing Discord.js v14 bot commands, events, components, schemas, and hybrid bot features. |
| `website-making` | Building Next.js, React, TypeScript, Tailwind, dashboards, API routes, and full-stack website features. |
| `ui-ux-design` | Designing web UI, Discord embeds, layouts, visual hierarchy, accessibility, and interaction states. |
| `bot-aesthetics` | Designing Discord bot personality, embed branding, rank cards, status messages, and visual identity. |
| `image-generation` | Adding AI image generation features, prompt design, provider selection, and image command safety. |
| `database` | Designing or reviewing Mongoose, MongoDB, Prisma, query patterns, indexes, and migrations. |
| `environment-config` | Managing `.env`, `.env.example`, config modules, secret safety, and deployment variables. |

## Preserved Optional Skills

These existing skills remain available for compatibility and broader workflows:

| Skill | Use When |
|---|---|
| `deployment` | Deploying bots or websites, Docker, PM2, CI/CD, production env vars, monitoring. |
| `idea-planner` | Turning rough ideas into scoped plans, MVP/v1/v2 tiers, and project structure. |
| `ultra-think` | Deep planning, architecture, risk mapping, and phased decomposition before implementation. |

## Cross-Skill Rules

- `context-tracker` handles local repository memory.
- `obsidian-brain` handles global long-term memory.
- `code-reviewer` should be used before shipping or after high-risk code changes.
- `database` and `environment-config` should be used for any schema, query, migration, or secret-related work.
- `ui-ux-design` and `bot-aesthetics` can both apply to Discord UI; use `bot-aesthetics` for bot identity and `ui-ux-design` for broader layout/accessibility.
