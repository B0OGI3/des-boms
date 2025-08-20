#!/bin/bash
# Development cleanup script for DES-BOMS

echo "🧹 DES-BOMS Development Cleanup"
echo "==============================="

# Remove development logs and temp files
echo "📁 Cleaning temporary files..."
find . -name "*.log" -not -path "./node_modules/*" -delete 2>/dev/null || true
find . -name "*.tmp" -not -path "./node_modules/*" -delete 2>/dev/null || true
find . -name "*.temp" -not -path "./node_modules/*" -delete 2>/dev/null || true

# Clean Next.js cache
echo "🔄 Cleaning Next.js cache..."
rm -rf .next

# Clean TypeScript build info
echo "📝 Cleaning TypeScript build cache..."
find . -name "*.tsbuildinfo" -delete 2>/dev/null || true

# Clean node_modules and reinstall (optional)
read -p "🔄 Clean and reinstall node_modules? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Cleaning node_modules..."
    rm -rf node_modules
    rm -f pnpm-lock.yaml
    echo "📦 Reinstalling dependencies..."
    pnpm install
fi

# Check for console.log statements
echo "🔍 Checking for console.log statements..."
if grep -r "console\.log" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next . > /dev/null; then
    echo "⚠️  Found console.log statements in:"
    grep -r "console\.log" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next . | cut -d: -f1 | sort | uniq
    echo "💡 Consider using proper logging in production"
else
    echo "✅ No console.log statements found"
fi

# Run linting
echo "🔍 Running ESLint..."
pnpm lint

echo ""
echo "✨ Cleanup complete!"
