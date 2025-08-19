@echo off
REM Pre-commit structure verification script for Windows
REM Run this before every commit to maintain our perfect structure!

echo 🏗️  DES-BOMS Structure Verification
echo ==================================

set "ALL_CHECKS_PASS=true"

echo.
echo 🔍 Running hierarchy verification...
call npm run verify-hierarchy >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Hierarchy check passed
) else (
    echo ❌ Hierarchy check failed
    set "ALL_CHECKS_PASS=false"
)

echo.
echo 🔍 Running organization verification...
call npm run verify-organization >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Organization check passed
) else (
    echo ❌ Organization check failed
    set "ALL_CHECKS_PASS=false"
)

echo.
echo 🔍 Checking for misplaced files in root...
set "MISPLACED_FILES=0"

REM Check for documentation files that should be in docs/
for %%f in (*.md) do (
    if not "%%f"=="README.md" (
        echo ⚠️  Found documentation file in root: %%f ^(should be in docs/^)
        set /a MISPLACED_FILES+=1
    )
)

REM Check for script files that should be in tools/ or deployment/
for %%f in (*.js *.sh *.bat) do (
    if not "%%f"=="pre-commit-structure-check.bat" (
        echo ⚠️  Found script file in root: %%f ^(should be in tools/ or deployment/^)
        set /a MISPLACED_FILES+=1
    )
)

REM Check for config files that should be in config/
if exist "*config*" (
    for %%f in (*config*) do (
        if not "%%f"=="next.config.ts" if not "%%f"=="tsconfig.json" if not "%%f"=="package.json" (
            echo ⚠️  Found config file in root: %%f ^(should be in config/^)
            set /a MISPLACED_FILES+=1
        )
    )
)

REM Check for TypeScript build files that can be ignored
for %%f in (tsconfig.tsbuildinfo) do (
    if exist "%%f" (
        del "%%f" >nul 2>&1
    )
)

if %MISPLACED_FILES% equ 0 (
    echo ✅ No misplaced files found in root
) else (
    echo ❌ Found %MISPLACED_FILES% misplaced files
    set "ALL_CHECKS_PASS=false"
)

echo.
echo 🔍 Checking barrel exports...
set "MISSING_BARRELS=0"

if not exist "app\components\index.ts" (
    echo ❌ Missing barrel export: app\components\index.ts
    set /a MISSING_BARRELS+=1
    set "ALL_CHECKS_PASS=false"
)

if not exist "app\components\ui\index.ts" (
    echo ❌ Missing barrel export: app\components\ui\index.ts
    set /a MISSING_BARRELS+=1
    set "ALL_CHECKS_PASS=false"
)

if not exist "lib\index.ts" (
    echo ❌ Missing barrel export: lib\index.ts
    set /a MISSING_BARRELS+=1
    set "ALL_CHECKS_PASS=false"
)

if not exist "types\index.ts" (
    echo ❌ Missing barrel export: types\index.ts
    set /a MISSING_BARRELS+=1
    set "ALL_CHECKS_PASS=false"
)

if not exist "hooks\index.ts" (
    echo ❌ Missing barrel export: hooks\index.ts
    set /a MISSING_BARRELS+=1
    set "ALL_CHECKS_PASS=false"
)

if not exist "utils\index.ts" (
    echo ❌ Missing barrel export: utils\index.ts
    set /a MISSING_BARRELS+=1
    set "ALL_CHECKS_PASS=false"
)

if %MISSING_BARRELS% equ 0 (
    echo ✅ All expected barrel exports present
)

echo.
echo ==================================

if "%ALL_CHECKS_PASS%"=="true" (
    echo 🎉 All structure checks passed! Ready to commit! 🚀
    exit /b 0
) else (
    echo ⚠️  Some structure checks failed. Please fix before committing.
    echo.
    echo Run these commands for detailed reports:
    echo   npm run verify-hierarchy
    echo   npm run verify-organization
    echo.
    echo See docs\STRUCTURE_MAINTENANCE_GUIDELINES.md for help!
    exit /b 1
)
