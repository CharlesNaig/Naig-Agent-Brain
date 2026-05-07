---
name: obsidian-brain
description: "Mandatory long-term memory skill. Use before and after every file-changing session to read Obsidian Brain context, create a new brain entry, and update the matching Project Index.md."
argument-hint: "No argument needed. Runs before planning and after local context is updated."
---

# Obsidian Brain Skill

## Purpose

The Obsidian vault is the user's long-term coding brain across Discord bots, websites, client work, and agent-system changes.

Vault path:

```txt
C:\Users\Charles\Documents\Obsidian Vault\My Brain
```

## Brain-First Requirement

Before file-changing work, read `/agent-system/base/BRAIN-FIRST-WORKFLOW.md`.

The short version:

1. Read local `CONTEXT.md`.
2. Read latest relevant `.context/` snapshots.
3. Read the matching Obsidian `Project Index.md`.
4. Read the latest 3 to 5 files from that project's `Brain Changes/` folder.
5. Use that memory before planning or editing.

If the Obsidian vault is unavailable, continue with local context and create a pending brain entry after the task.

## Required Behavior After File Changes

After a file-changing session:

1. Infer the correct project folder.
2. Create a brain change file in that folder's `Brain Changes\`.
3. Update that folder's `Project Index.md`.
4. If the vault is unavailable, create a pending fallback in `.context/obsidian-brain-pending/`.

## Project Folder Inference

- Tambayan project: `Discord Bots\Tambayan\Brain Changes\`
- Pinoy Lang project: `Discord Bots\Pinoy Lang\Brain Changes\`
- Filipino project: `Discord Bots\Filipino\Brain Changes\`
- Hiraya project: `Discord Bots\Hiraya\Brain Changes\`
- Portfolio project: `Website\My Portfolio\Brain Changes\`
- Client website project: `Website\Client\Brain Changes\`
- Uncertain project: `_Inbox\Brain Changes\`

## File Naming

Use local 24-hour time:

```txt
YYYY-MM-DD-HHMM-short-session-title.md
```

## Brain Entry Required Format

```markdown
# YYYY-MM-DD HH:mm — Short Session Title

## Project
- Name:
- Type:
- Repository:
- Local path:

## Agent Used
- Codex / Claude Code / GitHub Copilot / Ollama / OpenCode / Other

## What Changed
- File:
  - Change:
  - Reason:

## Important Decisions
- Decision:
- Why:

## Problems Found
- Issue:
- Fix:

## Current State
- Working:
- Not yet working:
- Needs testing:

## Next Steps
- [ ] Task 1
- [ ] Task 2

## Related Local Context
- `CONTEXT.md`
- `.context/YYYY-MM-DD-HHMM-short-session-title.md`
```

## Project Index Update

Add a wiki link to the top of `## Recent Changes`:

```markdown
- [[YYYY-MM-DD-HHMM-short-session-title]]
```

Create `Project Index.md` from `/agent-system/templates/project-index.md` if missing.
