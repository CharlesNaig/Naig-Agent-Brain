---
description: "MANDATORY — Applies to every file in every project. After completing any task that involved editing or creating files, the agent MUST update CONTEXT.md at the workspace root as the final step. This is required every time and cannot be skipped."
applyTo: ["**"]
---

# MANDATORY: Update CONTEXT.md After Every Work Session

## This Rule Is Non-Negotiable

After completing **any task that changed, created, or deleted files**, the agent's **last action MUST be** updating `CONTEXT.md` at the workspace root.

This applies regardless of:
- How small the change was
- What type of project it is
- Whether the user asked for it

## When to Skip (Only These Cases)

- The entire conversation was read-only (no files changed)
- The user asked a single factual/conversational question with no code written
- You answered with only an explanation and made zero file modifications

---

## What to Do

1. **Check if `CONTEXT.md` exists** at the workspace root
2. **If not** — create it from scratch using the format below
3. **If yes** — READ the existing file first, then PREPEND a new session entry to the Session Log section (newest entry at top)
4. **Never overwrite the whole file** — only prepend the new entry

## Minimal Required Format

```markdown
# Project Context

> Auto-updated by GitHub Copilot. Last updated: YYYY-MM-DD

---

## What We Are Building

[Short description of the overall project — update only if the project direction changed]

---

## Session Log

### [YYYY-MM-DD] — [Short title of what was done this session]

**What was done:**
- [file created/changed] — [why / what it does]

**Current state:**
- [what is complete] ✅
- [what is in progress] 🔄
- [what is not started] ⬜

**Key decisions:**
- [any important design choices made this session]

**Next steps:**
- [open TODOs or follow-ups]

---
```

## Key Rules

- Date must be today's actual date in `YYYY-MM-DD` format
- Title should be 3–6 words describing the main thing done: "Added ban command", "Created economy schema"  
- List every file that was meaningfully changed — not just "updated files"
- Keep old entries intact below the new one — this is a running log, not a snapshot
- The "What We Are Building" section at the top should always reflect the current project accurately

## Also Save a Snapshot

For every session, in addition to updating `CONTEXT.md`, also write the session entry to:
```
.github/.context/YYYY-MM-DD-<short-slug>.md
```
Example: `.github/.context/2026-04-09-created-ban-command.md`

This archive gives a clean per-session git history separate from the main running log.

## This is the LAST action of your turn — write CONTEXT.md and the snapshot AFTER all other work is done.
