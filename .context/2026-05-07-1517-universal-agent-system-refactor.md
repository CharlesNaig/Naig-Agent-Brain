### [2026-05-07] - Universal agent system refactor

**What was done:**
- `AGENTS.md` - Created the strict universal root entry point that tells every coding agent which base files and skills to read and which context files to update after edits.
- `CLAUDE.md` - Added a root Claude Code compatibility entry that points back to the universal system.
- `README.md` - Rewrote the repository overview around the universal skill system, supported agents, context tracking, Obsidian Brain workflow, and extension instructions.
- `agent-system/README.md` - Added neutral system documentation and required read order.
- `agent-system/base/*` - Added global rules, base skill index, code-quality rules, local context protocol, and Obsidian Brain protocol.
- `agent-system/adapters/*` - Added Codex, Claude Code, GitHub Copilot, OpenCode, and Ollama/local model adapters.
- `agent-system/skills/*/SKILL.md` - Added neutral source-of-truth skills for code review, context tracking, Obsidian Brain, Discord bot work, websites, UI/UX, bot aesthetics, image generation, database, environment config, deployment, idea planning, and deep planning.
- `agent-system/templates/*` - Added reusable templates for local context entries, Obsidian Brain entries, and project indexes.
- `.github/copilot-instructions.md` - Replaced the old Copilot-specific prompt with a GitHub Copilot compatibility adapter.
- `.github/instructions/*.instructions.md` - Replaced legacy instruction bodies with adapters pointing to the neutral base files and skills.
- `.github/skills/*/SKILL.md` - Replaced legacy skill bodies with compatibility wrappers pointing to `/agent-system/skills/`.
- `.github/skills/idea-planner/assets/PLAN-template.md` - Neutralized remaining Copilot-specific template wording.
- `.context/2026-05-07-1517-universal-agent-system-refactor.md` - Created the new local session snapshot under the root `.context/` archive.
- `C:\Users\Charles\Documents\Obsidian Vault\My Brain\_Inbox\Brain Changes\2026-05-07-1517-universal-agent-system-refactor.md` - Created the global Obsidian Brain session entry.
- `C:\Users\Charles\Documents\Obsidian Vault\My Brain\_Inbox\Project Index.md` - Created the `_Inbox` project index and linked the new brain entry.

**Current state:**
- Working: Neutral base system, agent adapters, skill files, templates, and `.github/` compatibility wrappers are in place.
- Not yet working: Nothing known from the markdown refactor itself.
- Needs testing: Actual behavior inside each supported external agent client should be verified during future sessions.

**Key decisions:**
- Decision: `agent-system/` is now the source of truth and `.github/` is compatibility-only.
- Why: Codex, Claude Code, OpenCode, Ollama/local models, and future agents may not treat `.github/` as their primary instruction source.
- Decision: New snapshots go to `.context/`; `.github/.context/` remains legacy.
- Why: Context tracking should not depend on GitHub-specific folder conventions.
- Decision: This repo's Obsidian Brain target is `_Inbox` unless the user later creates a more specific project folder.
- Why: The repo is a general agent skill system, not one of the named Discord bot or website projects.

**Verification:**
- Ran: Inspected key new files, listed `agent-system/`, checked `.github` wrapper structure, and searched for obsolete Copilot/Claude-only wording.
- Not run: Automated tests were not run because this repository change is markdown instruction content only.

**Next steps:**
- [ ] Test each adapter in its target agent client.
- [ ] Consider migrating legacy `.github/skills/*/references` and `assets` into `agent-system/skills/` if those examples should also become neutral source-of-truth assets.

---
