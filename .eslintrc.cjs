module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	ignorePatterns: ['.eslintrc.cjs', 'node_modules', 'coverage', 'src/exported/api/@types/i18n.d.ts'],
	root: true,
	overrides: [
		{
			files: ['*.ts'],
			plugins: ['@typescript-eslint', 'import'],
			extends: [
				'eslint:recommended',
				'plugin:@angular-eslint/recommended',
				'plugin:@angular-eslint/template/process-inline-templates',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:prettier/recommended',
				'plugin:import/recommended',
				'plugin:import/typescript',
			],
			settings: {
				'import/resolver': {
					typescript: true,
					node: true,
				},
			},
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/interface-name-prefix': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-unsafe-enum-comparison': 'off',
				'@typescript-eslint/no-namespace': 'off',
				'no-console': 'warn',
				'prettier/prettier': ['error', { endOfLine: 'lf' }],
				'import/export': 'off',
				'import/order': [
					'error',
					{
						'newlines-between': 'always',
						groups: ['type', 'builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
						pathGroups: [
							{
								pattern: '@(database|modules|templates|utils|src)/**',
								group: 'internal',
							},
						],
						pathGroupsExcludedImportTypes: ['builtin'],
						alphabetize: {
							order: 'asc',
							caseInsensitive: true,
						},
					},
				],
				'@angular-eslint/directive-selector': [
					'error',
					{
						type: 'attribute',
						prefix: 'sith',
						style: 'camelCase',
					},
				],
				'@angular-eslint/component-selector': [
					'error',
					{
						type: 'element',
						prefix: 'sith',
						style: 'kebab-case',
					},
				],
			},
		},
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended', 'plugin:@angular-eslint/template/accessibility'],
			rules: {},
		},
	],
};
