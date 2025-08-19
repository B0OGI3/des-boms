# DES-BOMS Development Tools

This directory contains various development, debugging, and maintenance tools for the DES-BOMS system.

## 🛠️ Available Tools

### QuickBooks Integration Tools
- **`debug-token.js`** - Debug QuickBooks token issues
- **`refresh-qb-tokens.js`** - Manually refresh QuickBooks tokens
- **`update-qb-tokens.js`** - Update QuickBooks token configuration
- **`diagnose-customers.js`** - Diagnose QuickBooks customer sync issues

### Development Tools
- **`parts-demonstration.js`** - Demo script for parts management features
- **`final-status.js`** - Check final status of various system components

## 🚀 Usage

Most tools can be run directly with Node.js:

```bash
# Example: Debug QuickBooks tokens
node tools/debug-token.js

# Example: Refresh QuickBooks tokens
node tools/refresh-qb-tokens.js
```

## 📝 Notes

- Ensure environment variables are properly configured before running tools
- Some tools may require database access
- Tools are primarily for development and debugging purposes
- For production maintenance, use the scripts in the `deployment/` directory
