# Context Protocol

This protocol is mandatory after every agent session that changes files.

## Purpose

`CONTEXT.md` is the local project memory. `.context/` is the local per-session snapshot archive. They let future agent sessions understand what changed, what decisions were made, and what remains open.

## Required Outputs

After any file changes, create or update:

```txt
CONTEXT.md
.context/YYYY-MM-DD-HHMM-short-session-title.md
```

Use 24-hour local time for `HHMM`.

## Legacy Compatibility

`.github/.context/` is legacy. Keep existing files there, but new snapshots go to `.context/`.

## When To Skip

Skip only when the entire session is read-only and no files were created, edited, moved, or deleted.

## CONTEXT.md Rules

- If `CONTEXT.md` does not exist, create it.
- If it exists, read it first and preserve old entries.
- Keep newest session entries at the top of `## Session Log`.
- Update `## What We Are Building` only when the project direction changed.
- Mention every meaningful file or group of files changed.
- Record verification that was run or why it was not run.

## Local Snapshot Rules

- Create one standalone markdown file in `.context/`.
- Filename format: `YYYY-MM-DD-HHMM-short-session-title.md`
- Content should be the session entry only, not the whole `CONTEXT.md`.
- Use the template in `/agent-system/templates/context-entry.md`.

## Final Step Ordering

For sessions with file changes, do these at the end:

1. Update `CONTEXT.md`.
2. Create `.context/YYYY-MM-DD-HHMM-short-session-title.md`.
3. Create the Obsidian Brain entry.
4. Update the Obsidian `Project Index.md`.

If Obsidian cannot be written, create the pending fallback file described in `/agent-system/base/OBSIDIAN-BRAIN-PROTOCOL.md`.
