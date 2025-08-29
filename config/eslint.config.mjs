import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['generated/**', '.next/**', 'out/**', 'node_modules/**'],
    rules: {
      // Prevent inline array/object expressions passed directly to JSX props
      // such as data={[]} or options={{}} which recreate identities each render
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'JSXAttribute[name.name=/^(data|options|items)$/] > ArrayExpression',
          message:
            'Avoid passing inline array literals to JSX props (data/options/items). Hoist or useMemo to stabilize identity.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(data|options|items)$/] > ObjectExpression',
          message:
            'Avoid passing inline object literals to JSX props (data/options/items). Hoist or useMemo to stabilize identity.',
        },
      ],
    },
  },
];

export default eslintConfig;
