# Universal Agent Entry

This repository uses the universal agent system. Any coding agent working here must treat these files as the source of truth before editing:

1. Read `/agent-system/base/GLOBAL-RULES.md`
2. Read `/agent-system/base/BASE-SKILLS.md`
3. Read `/agent-system/base/CONTEXT-PROTOCOL.md`
4. Read `/agent-system/base/OBSIDIAN-BRAIN-PROTOCOL.md`
5. For code work, also read `/agent-system/base/CODE-QUALITY.md`
6. Read the relevant skill file from `/agent-system/skills/`

## Brain-First Memory Workflow

Before planning or editing a file-changing task, read project memory in this order:

1. `CONTEXT.md`, if it exists.
2. The latest relevant `.context/` snapshots, if they exist.
3. The matching Obsidian Brain `Project Index.md`, if available.
4. The latest 3 to 5 markdown files inside the matching Obsidian `Brain Changes/` folder, if available.

Use the local context and Obsidian Brain notes together before deciding what to change.

If the Obsidian vault or project folder is unavailable, continue with local `CONTEXT.md` and `.context/`, then create a pending Obsidian entry at the end.

After any file changes, the final action must update:

- `CONTEXT.md`
- `.context/YYYY-MM-DD-HHMM-short-session-title.md`
- The Obsidian Brain entry and `Project Index.md` under `C:\Users\Charles\Documents\Obsidian Vault\My Brain`

If the Obsidian vault is unavailable, create the pending brain entry in `.context/obsidian-brain-pending/` and state where it must be copied.
