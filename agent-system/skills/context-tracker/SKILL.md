---
name: context-tracker
description: "Mandatory local project context update skill. Use after every agent session that changes files to update CONTEXT.md and create a .context snapshot."
argument-hint: "No argument needed. Runs after file-changing sessions."
---

# Context Tracker Skill

## Purpose

Keep local project memory current for future agent sessions.

## When This Runs

Run after every completed session that created, edited, moved, or deleted files.

Skip only for read-only sessions.

## Required Files

```txt
CONTEXT.md
.context/YYYY-MM-DD-HHMM-short-session-title.md
```

`.github/.context/` is legacy. Do not create new snapshots there unless a compatibility task explicitly asks for it.

## Procedure

1. Finish all implementation work first.
2. Read existing `CONTEXT.md`.
3. Update the "What We Are Building" section if the project direction changed.
4. Prepend the newest session entry under `## Session Log`.
5. Create a standalone `.context/` snapshot with the same entry.
6. Include verification performed or not performed.
7. Hand off to the `obsidian-brain` skill for global memory.

## Session Entry Format

```markdown
### [YYYY-MM-DD] - Short Session Title

**What was done:**
- `path/to/file` - Change and reason.

**Current state:**
- Working:
- Not yet working:
- Needs testing:

**Key decisions:**
- Decision:
- Why:

**Verification:**
- Ran:
- Not run:

**Next steps:**
- [ ] Task 1
- [ ] Task 2

---
```
