import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');
const prettierignorePath = path.resolve(import.meta.dirname, '.prettierignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	includeIgnoreFile(prettierignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },

		plugins: {
			perfectionist
		},

		rules: {
			'no-undef': 'off',

			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],

			'perfectionist/sort-imports': [
				'error',
				{
					type: 'alphabetical',
					order: 'asc',
					ignoreCase: false,
					newlinesBetween: 1,
					sortSideEffects: true,
					internalPattern: ['^\\$'],
					groups: [
						'type-import',
						['value-builtin', 'value-external'],

						'$env',
						'svelte',
						'@svelte',
						'$app',

						'$assets',
						'$packages',
						'$services',
						'$states',
						'$ui',
						'$blocks',
						'$lucide',
						'$icons',

						['type-internal', 'value-internal'],
						['type-parent', 'value-parent'],
						['type-sibling', 'value-sibling'],
						['type-index', 'value-index'],

						'$types',

						'unknown'
					],

					customGroups: [
						{
							groupName: '$env',
							elementNamePattern: '^\\$env'
						},
						{
							groupName: 'svelte',
							elementNamePattern: '^svelte'
						},
						{
							groupName: '@svelte',
							elementNamePattern: '^@svelte'
						},
						{
							groupName: '$app',
							elementNamePattern: '^\\$app/'
						},
						{
							groupName: '$types',
							elementNamePattern: '^\\./\\$types'
						},
						{
							groupName: '$assets',
							elementNamePattern: '^\\$assets'
						},
						{
							groupName: '$packages',
							elementNamePattern: '^\\$packages'
						},
						{
							groupName: '$services',
							elementNamePattern: '^\\$services'
						},
						{
							groupName: '$states',
							elementNamePattern: '^\\$states'
						},
						{
							groupName: '$ui',
							elementNamePattern: '^\\$ui'
						},
						{
							groupName: '$ui',
							elementNamePattern: '^\\$ui'
						},
						{
							groupName: '$blocks',
							elementNamePattern: '^\\$blocks'
						},
						{
							groupName: '$lucide',
							elementNamePattern: '^\\$lucide'
						},
						{
							groupName: '$icons',
							elementNamePattern: '^\\$icons'
						}
					]
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		files: ['src/lib/components/ui/button/button.svelte'],
		rules: {
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		rules: {}
	}
);
