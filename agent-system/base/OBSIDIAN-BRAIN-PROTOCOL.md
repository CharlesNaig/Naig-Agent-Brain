# Obsidian Brain Protocol

The Obsidian Brain is the user's long-term coding memory across projects.

## Vault Path

```txt
C:\Users\Charles\Documents\Obsidian Vault\My Brain
```

Treat this folder as long-term memory. Do not store secrets.

## Required Outputs

After every file-changing agent session:

- Create one brain change entry.
- Update the project's `Project Index.md`.

If the vault path does not exist or cannot be written, create:

```txt
.context/obsidian-brain-pending/YYYY-MM-DD-HHMM-short-session-title.md
```

Then tell the user to copy it into the vault path.

## Folder Rules

Use Windows-safe paths. Infer the project folder from repo name, package name, visible context, or user wording.

```txt
C:\Users\Charles\Documents\Obsidian Vault\My Brain\
  Discord Bots\
    Tambayan\
      Brain Changes\
      Project Index.md
    Pinoy Lang\
      Brain Changes\
      Project Index.md
    Filipino\
      Brain Changes\
      Project Index.md
    Hiraya\
      Brain Changes\
      Project Index.md

  Website\
    My Portfolio\
      Brain Changes\
      Project Index.md
    Client\
      Brain Changes\
      Project Index.md
```

Inference examples:

- Project mentions Tambayan: `Discord Bots\Tambayan\Brain Changes\`
- Project mentions Filipino: `Discord Bots\Filipino\Brain Changes\`
- Project is portfolio-related: `Website\My Portfolio\Brain Changes\`
- Project is uncertain: `_Inbox\Brain Changes\`

## Brain Entry Filename

Use:

```txt
YYYY-MM-DD-HHMM-short-session-title.md
```

Example:

```txt
2026-05-07-0215-refactored-svip-color-menu.md
```

## Brain Entry Format

Use `/agent-system/templates/obsidian-change-entry.md`.

Every entry must include:

- Project details
- Agent used
- What changed
- Important decisions
- Problems found
- Current state
- Next steps
- Related local context

## Project Index

Each project folder must contain:

```txt
Project Index.md
```

It should summarize:

- What the project is
- Current stack
- Active features
- Important decisions
- Latest session links
- Known issues
- Next steps

When creating a brain change file, update `Project Index.md` by adding a wiki link at the top of `Recent Changes`:

```markdown
- [[2026-05-07-0215-refactored-svip-color-menu]]
```

Use `/agent-system/templates/project-index.md` when creating a new index.
