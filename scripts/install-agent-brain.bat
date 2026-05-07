@echo off
setlocal

REM Naig Agent Brain installer wrapper for Command Prompt.
REM Usage:
REM   scripts\install-agent-brain.bat "C:\Users\Charles\Desktop\Projects\Tambayan-Bot"
REM   scripts\install-agent-brain.bat "C:\Projects\portfolio-v2" -ProjectType website -ProjectName "My Portfolio"

if "%~1"=="" (
    echo Usage: %~nx0 ^<TargetPath^> [extra PowerShell args]
    echo Example: %~nx0 "C:\Users\Charles\Desktop\Projects\Tambayan-Bot"
    exit /b 1
)

set "SCRIPT_DIR=%~dp0"
set "TARGET_PATH=%~1"
shift

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%install-agent-brain.ps1" -TargetPath "%TARGET_PATH%" %*

exit /b %ERRORLEVEL%
