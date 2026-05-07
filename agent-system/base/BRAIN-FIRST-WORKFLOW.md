# Brain-First Workflow

This workflow makes the Obsidian Brain a read-before-write memory system.

## Before Work

For any task that may change files, read memory in this order:

1. Local `CONTEXT.md`, if available.
2. Latest relevant files in `.context/`, if available.
3. Matching Obsidian Brain `Project Index.md`, if available.
4. Latest 3 to 5 markdown files in the matching Obsidian `Brain Changes/` folder, if available.

Use the local project context and Obsidian Brain notes together before planning or editing.

## If Obsidian Is Unavailable

Continue with local context only when the vault or matching project folder cannot be accessed.

Do not stop the task only because Obsidian cannot be read.

## After Work

After file changes, update memory in this order:

1. Update `CONTEXT.md`.
2. Create `.context/YYYY-MM-DD-HHMM-short-session-title.md`.
3. Create a new Obsidian Brain change entry.
4. Update the matching Obsidian `Project Index.md`.

If Obsidian cannot be written, create a fallback entry in `.context/obsidian-brain-pending/`.

## Project Folder Selection

Use the project name, repository name, package metadata, visible files, and user wording to select the matching Obsidian folder.

Known examples:

- Tambayan -> `Discord Bots/Tambayan`
- Pinoy Lang -> `Discord Bots/Pinoy Lang`
- Filipino -> `Discord Bots/Filipino`
- Hiraya -> `Discord Bots/Hiraya`
- Portfolio -> `Website/My Portfolio`
- Unclear project -> `_Inbox`
