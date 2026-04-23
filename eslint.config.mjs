import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  // 1. Core JS recommended rules
  js.configs.recommended,

  // 2. Global Ignores
  globalIgnores(['.next', 'node_modules', 'coverage']),

  // 3. Native Next.js Flat Configs (no FlatCompat needed!)
  ...nextVitals,
  ...nextTs,

  // 4. Custom Overrides
  {
    rules: {
      // TODO: Research these rules and enable them back if possible
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      // ------------------------------------------------------------

      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  }
]);
