# DES-BOMS Configuration Files

This directory contains configuration files for various tools and frameworks used in the DES-BOMS project.

## 📋 Configuration Files

### Code Quality & Linting
- **`eslint.config.mjs`** - ESLint configuration for code quality and style enforcement
  - TypeScript support
  - Next.js specific rules
  - Custom project-specific rules

### Styling & CSS
- **`postcss.config.mjs`** - PostCSS configuration for CSS processing
  - Tailwind CSS integration
  - CSS optimization and autoprefixing

- **`tailwind.config.ts`** - Tailwind CSS configuration
  - Custom color schemes
  - Component styling
  - Responsive design breakpoints

## 🔧 Configuration Updates

When modifying configurations:

1. **ESLint** - Update rules based on team coding standards
2. **PostCSS** - Add plugins for CSS processing needs
3. **Tailwind** - Customize theme, colors, and components

## 📝 Notes

- These files are automatically detected by their respective tools
- Configuration changes may require restarting the development server
- Keep configurations aligned with the project's coding standards

## 🔗 Related Files

- **Root `tsconfig.json`** - TypeScript configuration
- **Root `next.config.ts`** - Next.js configuration
- **Root `package.json`** - Dependencies and scripts
