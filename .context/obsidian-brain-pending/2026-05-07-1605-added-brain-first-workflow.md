# 2026-05-07 16:05 - Added Brain-First Workflow

## Project
- Name: Naig Agent Brain
- Type: Universal coding agent skill system
- Repository: CharlesNaig/Naig-Agent-Brain
- Local path: Not available in this remote GitHub session

## Agent Used
- ChatGPT GitHub connector

## What Changed
- File: `AGENTS.md`
  - Change: Added Brain-First Memory Workflow.
  - Reason: Require agents to read local and Obsidian memory before planning or editing.
- File: `agent-system/base/BRAIN-FIRST-WORKFLOW.md`
  - Change: Added a dedicated read-before-write memory protocol.
  - Reason: Give all agents and adapters one clear source for the brain-first loop.
- File: `agent-system/skills/obsidian-brain/SKILL.md`
  - Change: Updated skill description and required behavior to include reading brain memory before work.
  - Reason: Ensure agents that directly use the skill still follow the brain-first loop.
- File: `README.md`
  - Change: Documented the brain-first memory loop and improved the recommended first prompt.
  - Reason: Make usage clear for new projects and daily coding sessions.
- File: `.context/2026-05-07-1605-added-brain-first-workflow.md`
  - Change: Added local session snapshot.
  - Reason: Preserve the repository memory update.
- File: `.context/obsidian-brain-pending/2026-05-07-1605-added-brain-first-workflow.md`
  - Change: Added this pending Obsidian entry.
  - Reason: This remote GitHub session cannot directly write to the local Windows vault.

## Important Decisions
- Decision: Brain-first rules live in `agent-system/base/BRAIN-FIRST-WORKFLOW.md`.
- Why: A separate protocol is easier for agents to find and avoids duplicating long instructions everywhere.
- Decision: Obsidian read failure should not stop work.
- Why: Some agents run in cloud or repository-only environments and cannot access `C:\Users\Charles\Documents\Obsidian Vault\My Brain`.

## Problems Found
- Issue: Full protocol replacement attempts were blocked by the connector safety filter.
- Fix: Added a separate protocol file and linked to it from the source-of-truth files.

## Current State
- Working: Brain-first workflow is now documented and referenced.
- Not yet working: Local agent compliance has not been tested.
- Needs testing: Run Codex or Claude Code locally and verify it reads Obsidian before editing.

## Next Steps
- [ ] Copy this file into `C:\Users\Charles\Documents\Obsidian Vault\My Brain\_Inbox\Brain Changes\`.
- [ ] Add `[[2026-05-07-1605-added-brain-first-workflow]]` to `_Inbox\Project Index.md` under Recent Changes.
- [ ] Test one local project session using the new brain-first prompt.

## Related Local Context
- `CONTEXT.md`
- `.context/2026-05-07-1605-added-brain-first-workflow.md`
