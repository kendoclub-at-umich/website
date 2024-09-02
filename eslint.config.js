// @ts-check

import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default ts.config(
	js.configs.recommended,
	...ts.configs.strictTypeChecked,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.svelte']
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			eqeqeq: ['warn', 'smart'],
			'svelte/block-lang': ['error', { script: 'ts' }],
			'svelte/spaced-html-comment': 'warn',
			'@typescript-eslint/array-type': 'warn',
			'@typescript-eslint/prefer-find': 'warn',
			'@typescript-eslint/prefer-for-of': 'warn',
			'@typescript-eslint/prefer-includes': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'warn',
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'@typescript-eslint/prefer-regexp-exec': 'warn',
			'@typescript-eslint/prefer-string-starts-ends-with': 'warn'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		files: ['*.js', '*.cjs'],
		...ts.configs.disableTypeChecked
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', '.netlify/']
	}
);
