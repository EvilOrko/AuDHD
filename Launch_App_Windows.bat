@echo off
setlocal enabledelayedexpansion
title DopamineClean - AuDHD Home Task Tracker (Windows Portable)
cd /d "%~dp0"

echo ===================================================================
echo     DopamineClean - AuDHD Home Cleaning Task Tracker
echo ===================================================================
echo.

:: Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js not detected on your system.
    echo No problem! Launching 100% Portable Offline Mode...
    echo.
    start "" "%~dp0DopamineClean_Portable.html"
    echo App opened in your default web browser!
    echo.
    timeout /t 5 >nul
    exit /b 0
)

:: If Node.js is installed, ensure dependencies and build are ready
if not exist "node_modules\" (
    echo [1/2] Installing dependencies for full-stack mode...
    call npm install
)

if not exist "dist\" (
    echo [2/2] Building application...
    call npm run build
)

echo.
echo Starting local server on http://localhost:3000 ...
echo (Your browser will open automatically in 3 seconds)
echo.
echo -------------------------------------------------------------------
echo  Server Address: http://localhost:3000
echo  Backup Address: http://127.0.0.1:3000
echo.
echo  Keep this black window OPEN to maintain the local server.
echo  Or open 'DopamineClean_Portable.html' directly for zero-install mode!
echo -------------------------------------------------------------------
echo.

:: Schedule browser opening after 3 seconds so the server is ready to accept connections
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

:: Start the server using tsx
call npx tsx server.ts

:: Fallback if server stopped: open the portable file directly
if %ERRORLEVEL% neq 0 (
    echo.
    echo Server stopped. Opening portable edition directly...
    start "" "%~dp0DopamineClean_Portable.html"
)

pause
