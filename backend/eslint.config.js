import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base recommended rules
  js.configs.recommended,

  // TypeScript recommended (with type-checking)
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Console allowed in backend (logging)
      'no-console': 'off',

      // Unused variables — error, but allow underscore prefix
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // No 'any' type — strict
      '@typescript-eslint/no-explicit-any': 'error',

      // Prefer const over let when not reassigning
      'prefer-const': 'error',

      // Require explicit return types on functions
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Allow async functions without await (sometimes needed)
      '@typescript-eslint/require-await': 'off',
    },
  },

  // Ignore these folders
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.js'],
  },
);