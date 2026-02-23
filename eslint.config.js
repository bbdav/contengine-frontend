import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // This repo is a component library-style codebase; this rule is too strict and creates noise.
      'react-refresh/only-export-components': 'off',

      // This rule is overly aggressive for UI logic and flags benign patterns.
      'react-hooks/set-state-in-effect': 'off',

      // Allow underscore-prefixed args/vars for deliberate unused destructuring.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Prefer type aliases for prop passthroughs; don't error on empty extensions.
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
])
