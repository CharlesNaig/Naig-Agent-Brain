### [2026-05-07] - Added agent brain installer

**What was done:**
- `scripts/install-agent-brain.ps1` - Added the main Windows PowerShell installer that copies Naig Agent Brain into any target project folder.
- `scripts/install-agent-brain.bat` - Added a Command Prompt wrapper for the PowerShell installer.
- `README.md` - Renamed the project heading to `Naig Agent Brain` and documented installer usage, examples, installed files, Obsidian folder detection, and the recommended first agent prompt.
- `.context/2026-05-07-1545-added-agent-brain-installer.md` - Created this local session snapshot.
- `.context/obsidian-brain-pending/2026-05-07-1545-added-agent-brain-installer.md` - Created a pending Obsidian Brain entry because this remote GitHub session cannot directly write to the user's local Windows vault.

**Current state:**
- Working: The repo now includes an installer toolkit for copying `AGENTS.md`, `CLAUDE.md`, `agent-system/`, and `.github/copilot-instructions.md` into new projects.
- Working: The installer creates `CONTEXT.md`, `.context/`, a local install snapshot, and either an Obsidian Brain entry or fallback pending brain entry.
- Needs testing: Run the installer locally on Windows against a test folder and confirm the files copy correctly.

**Key decisions:**
- Decision: PowerShell is the primary installer and BAT is only a wrapper.
- Why: PowerShell can safely copy folders, create files, detect project names, update Obsidian folders, and support parameters.
- Decision: Installer defaults to `C:\Users\Charles\Documents\Obsidian Vault\My Brain` but supports `-ObsidianVaultPath` override.
- Why: The user may later move or rename the Obsidian vault.
- Decision: Project detection supports Tambayan, Pinoy Lang, Filipino, Hiraya, portfolio, website, discord-bot, and `_Inbox` fallback.
- Why: These are the user's recurring project categories.

**Verification:**
- Not run: The PowerShell installer was not executed in this remote GitHub environment.
- Manual review: Script syntax and flow were checked while authoring.

**Next steps:**
- [ ] Run `.\scripts\install-agent-brain.ps1 -TargetPath "C:\Users\Charles\Desktop\Projects\Test-Agent-Brain"` locally.
- [ ] Confirm the target project receives the expected files.
- [ ] Confirm the Obsidian Brain entry and `Project Index.md` are created or updated.

---
