#!/bin/bash
# Pre-commit structure verification script
# Run this before every commit to maintain our perfect structure!

echo "🏗️  DES-BOMS Structure Verification"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if all checks pass
ALL_CHECKS_PASS=true

echo ""
echo "🔍 Running hierarchy verification..."
if npm run verify-hierarchy > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Hierarchy check passed${NC}"
else
    echo -e "${RED}❌ Hierarchy check failed${NC}"
    ALL_CHECKS_PASS=false
fi

echo ""
echo "🔍 Running organization verification..."
if npm run verify-organization > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Organization check passed${NC}"
else
    echo -e "${RED}❌ Organization check failed${NC}"
    ALL_CHECKS_PASS=false
fi

echo ""
echo "🔍 Checking for temporary files in root..."
TEMP_FILES=$(find . -maxdepth 1 -name "*.tmp" -o -name "*.temp" -o -name "*~" -o -name "query" 2>/dev/null | wc -l)
if [ "$TEMP_FILES" -eq 0 ]; then
    echo -e "${GREEN}✅ No temporary files found in root${NC}"
else
    echo -e "${YELLOW}⚠️  Found $TEMP_FILES temporary files in root${NC}"
    echo "   Consider cleaning up before commit"
fi

echo ""
echo "🔍 Checking barrel exports..."
MISSING_BARRELS=0

# Check for main barrel exports
EXPECTED_BARRELS=(
    "app/components/index.ts"
    "app/components/ui/index.ts"
    "lib/index.ts"
    "types/index.ts"
    "hooks/index.ts"
    "utils/index.ts"
)

for barrel in "${EXPECTED_BARRELS[@]}"; do
    if [ ! -f "$barrel" ]; then
        echo -e "${RED}❌ Missing barrel export: $barrel${NC}"
        MISSING_BARRELS=$((MISSING_BARRELS + 1))
        ALL_CHECKS_PASS=false
    fi
done

if [ "$MISSING_BARRELS" -eq 0 ]; then
    echo -e "${GREEN}✅ All expected barrel exports present${NC}"
fi

echo ""
echo "=================================="

if [ "$ALL_CHECKS_PASS" = true ]; then
    echo -e "${GREEN}🎉 All structure checks passed! Ready to commit! 🚀${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some structure checks failed. Please fix before committing.${NC}"
    echo ""
    echo "Run these commands for detailed reports:"
    echo "  npm run verify-hierarchy"
    echo "  npm run verify-organization"
    echo ""
    echo "See docs/STRUCTURE_MAINTENANCE_GUIDELINES.md for help!"
    exit 1
fi
