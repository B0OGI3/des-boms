@echo off
REM DES-BOMS Security & Git Configuration Check (Windows)
REM Run this script to verify your Git setup is secure

echo 🔒 DES-BOMS Security ^& Git Configuration Check
echo ==============================================

REM Check for sensitive files in Git
echo.
echo 📁 Checking for sensitive files in Git tracking...

git ls-files | findstr /i "\.env \.key \.pem \.p12 \.crt" > temp_check.txt 2>nul
if %errorlevel% equ 0 (
    echo ❌ SECURITY WARNING: Sensitive files found in Git!
    type temp_check.txt
    echo    Please remove these files from Git immediately:
    echo    git rm --cached ^<filename^>
) else (
    echo ✅ No sensitive files found in Git tracking
)
del temp_check.txt 2>nul

REM Check .gitignore exists
echo.
echo 📋 Checking .gitignore configuration...

if exist ".gitignore" (
    echo ✅ .gitignore file exists
    
    REM Check for essential patterns
    findstr /c:".env" .gitignore >nul && echo ✅ .env is ignored || echo ⚠️  .env pattern missing
    findstr /c:"node_modules" .gitignore >nul && echo ✅ node_modules is ignored || echo ⚠️  node_modules pattern missing
    findstr /c:".next" .gitignore >nul && echo ✅ .next is ignored || echo ⚠️  .next pattern missing
    findstr /c:"*.log" .gitignore >nul && echo ✅ *.log is ignored || echo ⚠️  *.log pattern missing
    findstr /c:"uploads" .gitignore >nul && echo ✅ uploads is ignored || echo ⚠️  uploads pattern missing
) else (
    echo ❌ .gitignore file not found!
)

REM Check for .env.example
echo.
echo 📝 Checking environment template...

if exist ".env.example" (
    echo ✅ .env.example template exists
) else (
    echo ⚠️  .env.example template not found
)

REM Check current Git status
echo.
echo 📊 Current Git status:
git status --porcelain

echo.
echo 🎯 Security check complete!
echo.
echo 🛡️  Security Best Practices:
echo    • Never commit .env files
echo    • Use .env.example for templates  
echo    • Keep QuickBooks tokens in .env.local only
echo    • Review git status before commits
echo    • Use 'git add -p' for selective staging

pause
