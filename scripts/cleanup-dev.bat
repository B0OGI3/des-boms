@echo off
REM Development cleanup script for DES-BOMS (Windows)

echo 🧹 DES-BOMS Development Cleanup
echo ===============================

REM Remove development logs and temp files
echo 📁 Cleaning temporary files...
for /r %%i in (*.log) do if not "%%~pi"=="%cd%\node_modules\" del "%%i" 2>nul
for /r %%i in (*.tmp) do if not "%%~pi"=="%cd%\node_modules\" del "%%i" 2>nul
for /r %%i in (*.temp) do if not "%%~pi"=="%cd%\node_modules\" del "%%i" 2>nul

REM Clean Next.js cache
echo 🔄 Cleaning Next.js cache...
if exist ".next" rmdir /s /q ".next"

REM Clean TypeScript build info
echo 📝 Cleaning TypeScript build cache...
for /r %%i in (*.tsbuildinfo) do del "%%i" 2>nul

REM Check for console.log statements
echo 🔍 Checking for console.log statements...
findstr /s /i /m "console\.log" *.ts *.tsx 2>nul
if %errorlevel% equ 0 (
    echo ⚠️  Found console.log statements - consider using proper logging
) else (
    echo ✅ No console.log statements found
)

REM Run linting
echo 🔍 Running ESLint...
pnpm lint

echo.
echo ✨ Cleanup complete!
pause
