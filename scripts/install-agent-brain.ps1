<#
.SYNOPSIS
Installs Naig Agent Brain into a target project folder.

.EXAMPLE
.\scripts\install-agent-brain.ps1 -TargetPath "C:\Users\Charles\Desktop\Projects\Tambayan-Bot"

.EXAMPLE
.\scripts\install-agent-brain.ps1 -TargetPath "C:\Projects\portfolio-v2" -ProjectType website -ProjectName "My Portfolio"

.EXAMPLE
.\scripts\install-agent-brain.ps1 -TargetPath "C:\Projects\bot" -NonInteractive -Force
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$TargetPath,

    [string]$SourcePath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,

    [string]$ObsidianVaultPath = "C:\Users\Charles\Documents\Obsidian Vault\My Brain",

    [ValidateSet("auto", "discord-bot", "website", "general")]
    [string]$ProjectType = "auto",

    [string]$ProjectName = "",

    [switch]$Force,

    [switch]$NonInteractive
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "[Naig Agent Brain] $Message" -ForegroundColor Cyan
}

function Write-Skip {
    param([string]$Message)
    Write-Host "[Skip] $Message" -ForegroundColor DarkYellow
}

function Write-Done {
    param([string]$Message)
    Write-Host "[Done] $Message" -ForegroundColor Green
}

function Convert-ToSlug {
    param([string]$Text)

    $slug = $Text.ToLowerInvariant()
    $slug = $slug -replace "[^a-z0-9]+", "-"
    $slug = $slug.Trim("-")

    if ([string]::IsNullOrWhiteSpace($slug)) {
        return "agent-brain-install"
    }

    return $slug
}

function Get-ProjectName {
    param(
        [string]$ExplicitProjectName,
        [string]$ResolvedTargetPath
    )

    if (-not [string]::IsNullOrWhiteSpace($ExplicitProjectName)) {
        return $ExplicitProjectName
    }

    return Split-Path -Path $ResolvedTargetPath -Leaf
}

function Get-DetectedBrainFolder {
    param(
        [string]$Name,
        [string]$Type
    )

    $lowerName = $Name.ToLowerInvariant()

    if ($lowerName -match "tambayan") { return "Discord Bots\Tambayan" }
    if ($lowerName -match "pinoy") { return "Discord Bots\Pinoy Lang" }
    if ($lowerName -match "filipino") { return "Discord Bots\Filipino" }
    if ($lowerName -match "hiraya") { return "Discord Bots\Hiraya" }
    if ($lowerName -match "portfolio") { return "Website\My Portfolio" }

    if ($Type -eq "discord-bot") { return "Discord Bots\$Name" }
    if ($Type -eq "website") { return "Website\$Name" }
    if ($Type -eq "general") { return "_Inbox" }

    if ($lowerName -match "bot|discord") { return "Discord Bots\$Name" }
    if ($lowerName -match "web|site|portfolio|dashboard|client") { return "Website\$Name" }

    return "_Inbox"
}

function Copy-FileSafe {
    param(
        [string]$From,
        [string]$To,
        [switch]$Overwrite
    )

    $parent = Split-Path -Path $To -Parent
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }

    if ((Test-Path $To) -and -not $Overwrite) {
        Write-Skip "$To already exists. Use -Force to overwrite."
        return
    }

    Copy-Item -Path $From -Destination $To -Force:$Overwrite
    Write-Done "Copied $(Split-Path $From -Leaf)"
}

function Copy-DirectorySafe {
    param(
        [string]$From,
        [string]$To,
        [switch]$Overwrite
    )

    if ((Test-Path $To) -and -not $Overwrite) {
        Write-Skip "$To already exists. Use -Force to overwrite."
        return
    }

    if ((Test-Path $To) -and $Overwrite) {
        Remove-Item -Path $To -Recurse -Force
    }

    Copy-Item -Path $From -Destination $To -Recurse -Force
    Write-Done "Copied $(Split-Path $From -Leaf)/"
}

function New-ContextFileIfMissing {
    param(
        [string]$ContextPath,
        [string]$Name,
        [string]$Type
    )

    if (Test-Path $ContextPath) {
        Write-Skip "CONTEXT.md already exists."
        return
    }

    $today = Get-Date -Format "yyyy-MM-dd"
    $content = @"
# Project Context

> Auto-updated by Naig Agent Brain. Last updated: $today

---

## What We Are Building

$Name is a $Type project using Naig Agent Brain for cross-agent coding rules, local context tracking, and Obsidian Brain memory.

---

## Session Log

### [$today] - Installed Naig Agent Brain

**What was done:**
- Installed `AGENTS.md` as the universal agent entry point.
- Installed `CLAUDE.md` for Claude Code compatibility.
- Installed `agent-system/` with base rules, adapters, skills, and templates.
- Installed `.github/copilot-instructions.md` for GitHub Copilot compatibility.
- Created `.context/` for local session snapshots.

**Current state:**
- Working: Agent instruction files are installed.
- Needs testing: Run the preferred coding agent and confirm it reads `AGENTS.md`.

**Key decisions:**
- Decision: This project uses Naig Agent Brain as the shared instruction layer for Codex, Claude Code, Copilot, OpenCode, Ollama/local models, and future agents.
- Why: One neutral skill system prevents each agent from using different project rules.

**Next steps:**
- [ ] Ask the selected agent to read `AGENTS.md` before coding.
- [ ] Add project-specific notes to this `CONTEXT.md` after the first real coding session.

---
"@

    Set-Content -Path $ContextPath -Value $content -Encoding UTF8
    Write-Done "Created CONTEXT.md"
}

function New-InstallSnapshot {
    param(
        [string]$ContextDirectory,
        [string]$Name,
        [string]$BrainFolder
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
    $fileName = "$timestamp-installed-naig-agent-brain.md"
    $snapshotPath = Join-Path $ContextDirectory $fileName

    if (Test-Path $snapshotPath) {
        Write-Skip "$snapshotPath already exists."
        return $snapshotPath
    }

    $displayTime = Get-Date -Format "yyyy-MM-dd HH:mm"
    $content = @"
### [$displayTime] - Installed Naig Agent Brain

**What was done:**
- Installed universal agent files into `$Name`.
- Created or verified `CONTEXT.md`.
- Created or verified `.context/`.
- Selected Obsidian Brain folder: `$BrainFolder`.

**Current state:**
- Working: The project can now instruct Codex, Claude Code, GitHub Copilot, OpenCode, and Ollama/local models through the shared `AGENTS.md` and `agent-system/` files.
- Needs testing: Open the project in the preferred coding agent and ask it to read `AGENTS.md`.

**Key decisions:**
- Naig Agent Brain was installed locally instead of referenced remotely so file-reading agents can access the instructions without extra setup.

**Next steps:**
- [ ] Start the first coding session with: `Read AGENTS.md and CONTEXT.md first.`
- [ ] Confirm future file-changing sessions update `CONTEXT.md`, `.context/`, and Obsidian Brain.

---
"@

    Set-Content -Path $snapshotPath -Value $content -Encoding UTF8
    Write-Done "Created local install snapshot"
    return $snapshotPath
}

function New-ObsidianInstallEntry {
    param(
        [string]$VaultPath,
        [string]$RelativeBrainFolder,
        [string]$ProjectName,
        [string]$ProjectType,
        [string]$TargetPath,
        [string]$LocalSnapshotPath
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
    $displayTime = Get-Date -Format "yyyy-MM-dd HH:mm"
    $entryName = "$timestamp-installed-naig-agent-brain.md"
    $entryBaseName = [System.IO.Path]::GetFileNameWithoutExtension($entryName)

    $projectRoot = Join-Path $VaultPath $RelativeBrainFolder
    $changesDir = Join-Path $projectRoot "Brain Changes"
    $projectIndexPath = Join-Path $projectRoot "Project Index.md"

    New-Item -ItemType Directory -Force -Path $changesDir | Out-Null

    $entryPath = Join-Path $changesDir $entryName
    $entryContent = @"
# $displayTime - Installed Naig Agent Brain

## Project
- Name: $ProjectName
- Type: $ProjectType
- Repository: Not set during installer run
- Local path: `$TargetPath`

## Agent Used
- Installer script: `scripts/install-agent-brain.ps1`

## What Changed
- File: `AGENTS.md`
  - Change: Installed universal agent entry point.
  - Reason: Let all coding agents read one shared source of rules.
- File: `CLAUDE.md`
  - Change: Installed Claude Code compatibility entry.
  - Reason: Let Claude Code route back to the universal system.
- File: `agent-system/`
  - Change: Installed base rules, adapters, skills, and templates.
  - Reason: Provide reusable cross-agent behavior for coding sessions.
- File: `.github/copilot-instructions.md`
  - Change: Installed GitHub Copilot compatibility adapter.
  - Reason: Keep VS Code and Copilot workflows compatible.
- File: `CONTEXT.md` and `.context/`
  - Change: Created or verified local memory files.
  - Reason: Preserve project state for future agent sessions.

## Important Decisions
- Decision: Installed Naig Agent Brain directly into the project folder.
- Why: Local copies are easiest for Codex, Claude Code, Copilot, OpenCode, and local models to read consistently.

## Problems Found
- Issue: None during installer run.
- Fix: Not applicable.

## Current State
- Working: Agent files are installed in the project.
- Not yet working: No project-specific code was generated by this installer.
- Needs testing: Start a coding agent session and confirm it reads `AGENTS.md`.

## Next Steps
- [ ] Open the target project in the preferred coding agent.
- [ ] Prompt: `Read AGENTS.md and CONTEXT.md first.`
- [ ] Build the base project structure using the relevant skill files.

## Related Local Context
- `CONTEXT.md`
- `$LocalSnapshotPath`
"@

    Set-Content -Path $entryPath -Value $entryContent -Encoding UTF8

    if (-not (Test-Path $projectIndexPath)) {
        $indexContent = @"
# $ProjectName - Project Index

## What This Project Is

$ProjectName is a $ProjectType project using Naig Agent Brain for cross-agent development memory.

## Current Stack

- Not defined yet

## Active Features

- Naig Agent Brain installed

## Important Decisions

- Uses local `AGENTS.md` and `agent-system/` as the project instruction layer.

## Recent Changes

- [[$entryBaseName]]

## Known Issues

- None recorded yet

## Next Steps

- [ ] Define the project stack
- [ ] Start the first coding session
"@
        Set-Content -Path $projectIndexPath -Value $indexContent -Encoding UTF8
    }
    else {
        $index = Get-Content -Path $projectIndexPath -Raw
        $link = "- [[$entryBaseName]]"

        if ($index -notmatch [regex]::Escape($link)) {
            if ($index -match "(?m)^## Recent Changes\s*$") {
                $index = $index -replace "(?m)^## Recent Changes\s*$", "## Recent Changes`r`n`r`n$link"
            }
            else {
                $index += "`r`n`r`n## Recent Changes`r`n`r`n$link`r`n"
            }

            Set-Content -Path $projectIndexPath -Value $index -Encoding UTF8
        }
    }

    Write-Done "Created Obsidian Brain entry"
    Write-Done "Updated Obsidian Project Index"
}

function New-PendingObsidianEntry {
    param(
        [string]$ContextDirectory,
        [string]$ProjectName,
        [string]$ProjectType,
        [string]$TargetPath,
        [string]$RelativeBrainFolder
    )

    $pendingDir = Join-Path $ContextDirectory "obsidian-brain-pending"
    New-Item -ItemType Directory -Force -Path $pendingDir | Out-Null

    $timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
    $displayTime = Get-Date -Format "yyyy-MM-dd HH:mm"
    $pendingPath = Join-Path $pendingDir "$timestamp-installed-naig-agent-brain.md"

    $content = @"
# $displayTime - Installed Naig Agent Brain

## Project
- Name: $ProjectName
- Type: $ProjectType
- Repository: Not set during installer run
- Local path: `$TargetPath`

## Agent Used
- Installer script: `scripts/install-agent-brain.ps1`

## What Changed
- Installed Naig Agent Brain into the target project.
- Created or verified local context files.

## Important Decisions
- Intended Obsidian folder: `$RelativeBrainFolder`

## Problems Found
- Issue: Obsidian vault path was unavailable during installer run.
- Fix: Copy this pending entry into the matching Obsidian Brain folder manually.

## Current State
- Working: Local agent brain files are installed.
- Needs testing: Confirm the coding agent reads `AGENTS.md`.

## Next Steps
- [ ] Copy this file into `C:\Users\Charles\Documents\Obsidian Vault\My Brain\$RelativeBrainFolder\Brain Changes\`.
- [ ] Update that folder's `Project Index.md` with a wiki link to this entry.

## Related Local Context
- `CONTEXT.md`
- `.context/`
"@

    Set-Content -Path $pendingPath -Value $content -Encoding UTF8
    Write-Done "Created pending Obsidian Brain entry at $pendingPath"
}

# Resolve paths.
$sourceRoot = (Resolve-Path $SourcePath).Path
$targetRoot = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($TargetPath)

Write-Step "Source: $sourceRoot"
Write-Step "Target: $targetRoot"

if (-not (Test-Path $targetRoot)) {
    New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null
    Write-Done "Created target project directory"
}

$projectNameValue = Get-ProjectName -ExplicitProjectName $ProjectName -ResolvedTargetPath $targetRoot
$detectedBrainFolder = Get-DetectedBrainFolder -Name $projectNameValue -Type $ProjectType

if (-not $NonInteractive) {
    Write-Host ""
    Write-Host "Detected project name: $projectNameValue" -ForegroundColor White
    Write-Host "Detected Obsidian folder: $detectedBrainFolder" -ForegroundColor White
    $answer = Read-Host "Press Enter to accept, or type a custom relative folder like 'Discord Bots\Tambayan'"

    if (-not [string]::IsNullOrWhiteSpace($answer)) {
        $detectedBrainFolder = $answer.Trim().Trim("\")
    }
}

# Copy core files.
Copy-FileSafe -From (Join-Path $sourceRoot "AGENTS.md") -To (Join-Path $targetRoot "AGENTS.md") -Overwrite:$Force
Copy-FileSafe -From (Join-Path $sourceRoot "CLAUDE.md") -To (Join-Path $targetRoot "CLAUDE.md") -Overwrite:$Force
Copy-DirectorySafe -From (Join-Path $sourceRoot "agent-system") -To (Join-Path $targetRoot "agent-system") -Overwrite:$Force
Copy-FileSafe -From (Join-Path $sourceRoot ".github\copilot-instructions.md") -To (Join-Path $targetRoot ".github\copilot-instructions.md") -Overwrite:$Force

# Create local context files.
$contextDir = Join-Path $targetRoot ".context"
New-Item -ItemType Directory -Force -Path $contextDir | Out-Null
Write-Done "Created or verified .context/"

$finalProjectType = if ($ProjectType -eq "auto") { "auto-detected" } else { $ProjectType }
New-ContextFileIfMissing -ContextPath (Join-Path $targetRoot "CONTEXT.md") -Name $projectNameValue -Type $finalProjectType
$localSnapshotPath = New-InstallSnapshot -ContextDirectory $contextDir -Name $projectNameValue -BrainFolder $detectedBrainFolder

# Create Obsidian entry or fallback.
if (Test-Path $ObsidianVaultPath) {
    New-ObsidianInstallEntry `
        -VaultPath $ObsidianVaultPath `
        -RelativeBrainFolder $detectedBrainFolder `
        -ProjectName $projectNameValue `
        -ProjectType $finalProjectType `
        -TargetPath $targetRoot `
        -LocalSnapshotPath $localSnapshotPath
}
else {
    New-PendingObsidianEntry `
        -ContextDirectory $contextDir `
        -ProjectName $projectNameValue `
        -ProjectType $finalProjectType `
        -TargetPath $targetRoot `
        -RelativeBrainFolder $detectedBrainFolder

    Write-Host "Obsidian vault was not found at: $ObsidianVaultPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Done "Naig Agent Brain installed."
Write-Host "Next prompt to your coding agent:" -ForegroundColor Cyan
Write-Host "Read AGENTS.md and CONTEXT.md first. Then continue from the current project state." -ForegroundColor White
