# Global Rules

These rules apply to every LLM coding agent working in this repository.

## Operating Rules

- Read `/AGENTS.md` and the base files before editing.
- Check `CONTEXT.md` before making changes so current project state is not lost.
- Select the smallest relevant skill set from `/agent-system/skills/`.
- Make minimal but complete changes that solve the task.
- Preserve existing project style, naming, formatting, and architecture unless the task requires changing them.
- Do not delete useful existing content when refactoring instructions; move, summarize, or wrap it cleanly.
- Prefer markdown-first changes for this repository.
- Do not add packages, generated binaries, or build artifacts unless explicitly required.
- Do not hardcode secrets, tokens, API keys, machine-specific credentials, or private URLs.
- Keep compatibility files as adapters when possible instead of duplicating the full system.

## Agent-Neutral Language

Base files must use neutral wording such as:

- coding agent
- LLM coding agent
- agent session
- assistant
- current agent

Avoid agent-specific mandates in base files. If a rule applies only to one tool, put it in that tool's adapter.

Agent-specific wording belongs only in adapter files.

## Change Discipline

- Before editing, identify the relevant files and the skill protocol that applies.
- During edits, keep the scope narrow and avoid unrelated rewrites.
- After edits, verify markdown links, paths, and obvious formatting issues.
- If code is changed in a downstream project, run the relevant checks when available.
- If verification cannot be run, record that in context.

## Mandatory Final Step

If files were created, edited, moved, or deleted, the current agent's final step must follow both:

- `/agent-system/base/CONTEXT-PROTOCOL.md`
- `/agent-system/base/OBSIDIAN-BRAIN-PROTOCOL.md`

This is skipped only for fully read-only sessions.
