import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';

export default [
	// Ignore built output
	{ ignores: ['dist/**'] },

	js.configs.recommended,

	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			import: importPlugin,
			plugins: { prettier },
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			'prettier/prettier': 'warn',

			// React 17+ / Vite doesn't require React in scope
			'react/react-in-jsx-scope': 'off',

			// Hooks safety (must-have)
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// Useful sanity checks
			'react/jsx-key': 'error',

			// Keep unused vars strict but allow _unused pattern
			'no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],

			// Import hygiene
			'import/no-unresolved': 'off', // bundlers handle this; avoids false positives
			'import/order': [
				'warn',
				{
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],

			// Accessibility (keep warnings so it nudges, not blocks)
			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/anchor-is-valid': 'warn',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/no-static-element-interactions': 'warn',
		},
	},

	// Optional: disables ESLint formatting rules that fight Prettier
	prettierConfig,
];
