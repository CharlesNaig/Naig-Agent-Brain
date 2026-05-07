# Naig Agent Brain

This repository is a universal, LLM-agnostic coding agent skill system. It started as a GitHub Copilot instruction suite and now exposes one neutral base system that can be read by Codex, Claude Code, GitHub Copilot, Ollama/local models, OpenCode, and future coding agents.

## How It Works

The root `AGENTS.md` is the universal front door. Agent-specific files are thin adapters that point back to the same base rules and skills.

Core files:

- `AGENTS.md` - root entry for all agents
- `CONTEXT.md` - local repository memory
- `agent-system/base/` - neutral rules and protocols
- `agent-system/skills/` - reusable domain skills
- `agent-system/adapters/` - agent-specific compatibility prompts
- `agent-system/templates/` - context and Obsidian entry templates
- `scripts/` - installers for copying Naig Agent Brain into new projects

## Brain-First Memory Loop

Naig Agent Brain is designed as a read-before-write memory system.

Before file-changing work, agents should read:

1. `CONTEXT.md`
2. Latest relevant `.context/` snapshots
3. Matching Obsidian Brain `Project Index.md`
4. Latest 3 to 5 markdown files from the matching Obsidian `Brain Changes/` folder

After file-changing work, agents must update:

1. `CONTEXT.md`
2. `.context/YYYY-MM-DD-HHMM-short-session-title.md`
3. A new Obsidian Brain change entry
4. The matching Obsidian `Project Index.md`

The dedicated protocol lives at:

```txt
agent-system/base/BRAIN-FIRST-WORKFLOW.md
```

If Obsidian is unavailable, agents continue with local context and create a fallback entry in:

```txt
.context/obsidian-brain-pending/
```

## Install Into A New Project

Use the installer when starting a new project so the project immediately gets the universal agent rules, adapters, skills, local context files, and Obsidian Brain registration.

PowerShell:

```powershell
.\scripts\install-agent-brain.ps1 -TargetPath "C:\Users\Charles\Desktop\Projects\Tambayan-Bot"
```

Command Prompt / double-click friendly wrapper:

```bat
scripts\install-agent-brain.bat "C:\Users\Charles\Desktop\Projects\Tambayan-Bot"
```

Optional examples:

```powershell
.\scripts\install-agent-brain.ps1 -TargetPath "C:\Projects\portfolio-v2" -ProjectType website -ProjectName "My Portfolio"
```

```powershell
.\scripts\install-agent-brain.ps1 -TargetPath "C:\Projects\filipino-bot" -ProjectType discord-bot -NonInteractive -Force
```

The installer copies or creates:

- `AGENTS.md`
- `CLAUDE.md`
- `agent-system/`
- `.github/copilot-instructions.md`
- `CONTEXT.md` if missing
- `.context/` if missing
- `.context/YYYY-MM-DD-HHMM-installed-naig-agent-brain.md`
- Obsidian Brain entry and `Project Index.md` when the vault path exists
- `.context/obsidian-brain-pending/` fallback when the vault path is unavailable

By default, the installer uses this Obsidian vault path:

```txt
C:\Users\Charles\Documents\Obsidian Vault\My Brain
```

The installer auto-detects common project names:

- `Tambayan` -> `Discord Bots\Tambayan`
- `Pinoy` -> `Discord Bots\Pinoy Lang`
- `Filipino` -> `Discord Bots\Filipino`
- `Hiraya` -> `Discord Bots\Hiraya`
- `portfolio` -> `Website\My Portfolio`
- uncertain/general projects -> `_Inbox`

You can accept the detected Obsidian folder by pressing Enter, or type a custom relative folder such as:

```txt
Discord Bots\Tambayan
```

After installation, open the target project and start your coding agent with:

```txt
Read AGENTS.md, CONTEXT.md, the matching Obsidian Project Index.md, and the latest Brain Changes first. Then continue from the current project state.
```

## Supported Agents

- Codex reads `AGENTS.md` and can also use `agent-system/adapters/codex/AGENTS.md`.
- Claude Code can read root `CLAUDE.md` or `agent-system/adapters/claude-code/CLAUDE.md`, both of which point back to `AGENTS.md`.
- GitHub Copilot reads `.github/copilot-instructions.md`, now a compatibility adapter.
- Ollama/local models can use `agent-system/adapters/ollama/SYSTEM-PROMPT.md` as a copy-pasteable system prompt.
- OpenCode reads `agent-system/adapters/opencode/AGENTS.md`.

## Base Skills

The base skill index lives in `agent-system/base/BASE-SKILLS.md`. Skills live under `agent-system/skills/<skill-name>/SKILL.md`.

Current core skills:

- `code-reviewer`
- `context-tracker`
- `obsidian-brain`
- `discord-bot`
- `website-making`
- `ui-ux-design`
- `bot-aesthetics`
- `image-generation`
- `database`
- `environment-config`

Preserved optional skills:

- `deployment`
- `idea-planner`
- `ultra-think`

## Context Tracking

Every agent session that changes files must update local project memory:

- Update `CONTEXT.md`
- Create `.context/YYYY-MM-DD-HHMM-short-session-title.md`

Legacy `.github/.context/` snapshots remain for compatibility, but new session snapshots go in `.context/`.

## Obsidian Brain

The global long-term brain path is:

```txt
C:\Users\Charles\Documents\Obsidian Vault\My Brain
```

Before work, agents should read the matching Obsidian `Project Index.md` and latest `Brain Changes/` notes when available. After file changes, agents must create one brain entry and update the matching `Project Index.md`. If the correct project folder cannot be inferred, use:

```txt
C:\Users\Charles\Documents\Obsidian Vault\My Brain\_Inbox\Brain Changes
```

If the vault is unavailable, agents create a fallback entry in:

```txt
.context/obsidian-brain-pending/
```

## Add A New Skill

1. Create `agent-system/skills/<skill-name>/SKILL.md`.
2. Keep wording neutral: use "coding agent", "assistant", or "current agent".
3. Add the skill to `agent-system/base/BASE-SKILLS.md`.
4. If GitHub Copilot compatibility is needed, add a wrapper in `.github/skills/<skill-name>/SKILL.md`.
5. Update `CONTEXT.md` and create the required context snapshots.

## Add A New Agent Adapter

1. Create `agent-system/adapters/<agent-name>/`.
2. Add the adapter file expected by that agent.
3. Keep the adapter short and point it to `AGENTS.md` plus base files.
4. Do not duplicate base rules in the adapter unless the target agent needs a specific format.

## Compatibility

Existing `.github/` files are kept for GitHub Copilot and legacy VS Code behavior. They are not the source of truth anymore; they point to the neutral `agent-system/` files.
