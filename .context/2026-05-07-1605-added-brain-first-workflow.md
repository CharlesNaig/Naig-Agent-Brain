### [2026-05-07] - Added brain-first workflow

**What was done:**
- `AGENTS.md` - Added a Brain-First Memory Workflow requiring agents to read local context, relevant `.context/` snapshots, the matching Obsidian `Project Index.md`, and latest Brain Changes before planning or editing.
- `agent-system/base/BRAIN-FIRST-WORKFLOW.md` - Created a dedicated protocol file for read-before-write memory behavior.
- `agent-system/skills/obsidian-brain/SKILL.md` - Updated the Obsidian skill so it explicitly requires the brain-first workflow before file-changing work.
- `README.md` - Documented the brain-first memory loop and updated the recommended first prompt for new projects.
- `.context/2026-05-07-1605-added-brain-first-workflow.md` - Created this local session snapshot.
- `.context/obsidian-brain-pending/2026-05-07-1605-added-brain-first-workflow.md` - Created a pending Obsidian Brain entry because this remote GitHub session cannot directly write to the user's local Windows vault.

**Current state:**
- Working: Agents are now instructed to read Obsidian Brain memory before work and update it after work.
- Working: A dedicated `BRAIN-FIRST-WORKFLOW.md` file exists as the source protocol for the read-before-write memory loop.
- Needs testing: Run a local agent session with access to the Obsidian vault and confirm it reads the target Project Index and latest Brain Changes before editing.

**Key decisions:**
- Decision: Brain-first rules live in a separate base protocol file.
- Why: This avoids bloating Obsidian protocol text and gives all adapters a simple file to read.
- Decision: Agents should continue with local context if Obsidian is unavailable.
- Why: The workflow should not fail just because a cloud or remote environment cannot access the local Windows vault.

**Verification:**
- Not run: Local agent behavior was not tested in this remote GitHub environment.
- Manual review: Confirmed the repository now contains the brain-first protocol file and references it from the Obsidian skill and README.

**Next steps:**
- [ ] Test Codex locally on a project with Obsidian vault access.
- [ ] Confirm it reads `Project Index.md` and the latest 3 to 5 Brain Changes before editing.
- [ ] Consider adding a `-ReadBrainFirst` verification mode to the installer later.

---
