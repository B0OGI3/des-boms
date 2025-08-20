#!/bin/bash
# DES-BOMS Security & Git Configuration Check
# Run this script to verify your Git setup is secure

echo "🔒 DES-BOMS Security & Git Configuration Check"
echo "=============================================="

# Check for sensitive files in Git
echo ""
echo "📁 Checking for sensitive files in Git tracking..."

if git ls-files | grep -E '\.(env|key|pem|p12|crt)$' > /dev/null; then
    echo "❌ SECURITY WARNING: Sensitive files found in Git!"
    git ls-files | grep -E '\.(env|key|pem|p12|crt)$'
    echo "   Please remove these files from Git immediately:"
    echo "   git rm --cached <filename>"
else
    echo "✅ No sensitive files found in Git tracking"
fi

# Check .gitignore exists and has essential patterns
echo ""
echo "📋 Checking .gitignore configuration..."

if [ -f ".gitignore" ]; then
    echo "✅ .gitignore file exists"
    
    # Check for essential patterns
    patterns=(".env" "node_modules" ".next" "*.log" "uploads")
    for pattern in "${patterns[@]}"; do
        if grep -q "$pattern" .gitignore; then
            echo "✅ $pattern is ignored"
        else
            echo "⚠️  $pattern pattern missing from .gitignore"
        fi
    done
else
    echo "❌ .gitignore file not found!"
fi

# Check for .env.example
echo ""
echo "📝 Checking environment template..."

if [ -f ".env.example" ]; then
    echo "✅ .env.example template exists"
else
    echo "⚠️  .env.example template not found"
fi

# Check current Git status
echo ""
echo "📊 Current Git status:"
git status --porcelain | head -10

echo ""
echo "🎯 Security check complete!"
echo ""
echo "🛡️  Security Best Practices:"
echo "   • Never commit .env files"
echo "   • Use .env.example for templates"
echo "   • Keep QuickBooks tokens in .env.local only"
echo "   • Review git status before commits"
echo "   • Use 'git add -p' for selective staging"
