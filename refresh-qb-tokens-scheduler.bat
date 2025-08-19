@echo off
REM QuickBooks Token Auto-Refresh Script for Windows
REM Run this script periodically via Windows Task Scheduler
REM 
REM To set up scheduled task:
REM 1. Open Task Scheduler
REM 2. Create Basic Task
REM 3. Set trigger to run every 30 minutes
REM 4. Set action to start this batch file
REM 5. Set "Start in" directory to your project folder

echo [%date% %time%] Starting QuickBooks token refresh...

REM Change to the script directory
cd /d "%~dp0"

REM Run the refresh script
node refresh-qb-tokens.js --quiet

if %ERRORLEVEL% EQU 0 (
    echo [%date% %time%] Token refresh completed successfully
) else (
    echo [%date% %time%] Token refresh failed with error code %ERRORLEVEL%
)

REM Optional: log to file
echo [%date% %time%] Token refresh result: %ERRORLEVEL% >> qb-token-refresh.log

exit /b %ERRORLEVEL%
