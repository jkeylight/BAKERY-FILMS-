@echo off
REM ============================================================
REM  NOIR Cinematic Slider - ROLLBACK
REM  Restores the NEWEST locked build tag (build-lock-*).
REM  WARNING: This DISCARDS all uncommitted changes.
REM ============================================================
setlocal enabledelayedexpansion
echo.
echo  [NOIR ROLLBACK]
echo  This will restore the newest locked build and DELETE all
echo  changes made since it was locked. Files in .freebuff\ are
echo  untouched.
echo.
set /p CONFIRM=Type ROLLBACK to continue, or anything else to cancel: 
if /i not "%CONFIRM%"=="ROLLBACK" (
    echo  Cancelled. Nothing changed.
    pause
    exit /b 1
)

REM Pick the newest tag (newest-created first, so grab the first one)
set "TAG="
for /f "delims=" %%i in ('git for-each-ref --sort=-creatordate --format="%%(refname:short)" refs/tags') do (
    set "TAG=%%i"
    goto :found
)
:found
if "%TAG%"=="" (
    echo  FAILED: no lock tag found. Is Git installed and is this a repo?
    pause
    exit /b 1
)

git reset --hard %TAG%
if errorlevel 1 (
    echo.
    echo  FAILED. Could not restore %TAG%.
) else (
    echo.
    echo  OK - restored to locked build %TAG%.
    git log -1 --oneline
)
echo.
pause