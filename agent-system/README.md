# Universal Agent System

This folder contains the neutral source of truth for repository instructions, skills, context tracking, and long-term Obsidian Brain updates.

## Read Order

Any coding agent should read these first:

1. `/AGENTS.md`
2. `/agent-system/base/GLOBAL-RULES.md`
3. `/agent-system/base/BASE-SKILLS.md`
4. `/agent-system/base/CONTEXT-PROTOCOL.md`
5. `/agent-system/base/OBSIDIAN-BRAIN-PROTOCOL.md`
6. `/agent-system/base/CODE-QUALITY.md` when code will be edited
7. Relevant files under `/agent-system/skills/`

## Folder Map

```txt
agent-system/
  base/       Neutral shared rules and protocols
  adapters/   Thin agent-specific entry files
  skills/     Domain skills used by all agents
  templates/  Markdown templates for context and brain entries
```

## Source Of Truth

Base files and skills in this folder are authoritative. Compatibility files in `.github/` should point here instead of duplicating behavior.

## Context Outputs

After a session with file changes, the current agent must write:

- `CONTEXT.md`
- `.context/YYYY-MM-DD-HHMM-short-session-title.md`
- Obsidian Brain change file
- Obsidian `Project Index.md`

If the Obsidian vault cannot be written, the current agent must create a pending entry under `.context/obsidian-brain-pending/`.
