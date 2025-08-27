# Linting guidelines

This project enforces a rule to avoid inline array and object literals inside JSX props, because they create new references each render and can cause excessive re-renders or UI hangs (especially for components like Mantine Select which rely on stable `data` props).

Rule summary:

- The ESLint rule `no-restricted-syntax` now flags ArrayExpression and ObjectExpression used directly inside JSX attributes. Example:
  - Bad: <Select data={[...]} />

  - Good: const options = useMemo(() => [...], []); <Select data={options} />

Pre-commit hook:

- A Husky pre-commit hook is present at `.husky/pre-commit` which runs `npm run pre-commit` (lint, type-check, format:check) if Husky is installed.

How to enable Husky locally:

- npm install husky --save-dev

- npx husky install

- npx husky add .husky/pre-commit "npm run pre-commit"

If you prefer not to use Husky, ensure your CI runs `npm run pre-commit` to prevent regressions.
