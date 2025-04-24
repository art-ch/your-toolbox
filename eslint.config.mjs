import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores(['.next', 'node_modules', 'coverage']),

  {
    extends: compat.extends('next/core-web-vitals', 'next/typescript'),

    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
]);
