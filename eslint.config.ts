import eslintPlugin from '@eslint/js'
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint'
// @ts-expect-error: Could not find a declaration file for module 'eslint-plugin-import'.
import importPlugin from 'eslint-plugin-import';
import * as mdxPlugin from 'eslint-plugin-mdx'

const eslintConfig = [
    {
        name: 'custom/eslint/recommended',
        // all files expect mdx files
        files: ['**/*.mjs', '**/*.ts?(x)'],
        ...eslintPlugin.configs.recommended,
    },
]

const ignoresConfig = [
    {
        name: 'custom/eslint/ignores',
        // the global ignores must be in it's own config object
        ignores: [
            '.next/',
            '.vscode/',
            'public/',
        ]
    },
]

const tseslintConfig = tseslint.config(
    {
        name: 'custom/typescript-eslint/recommended',
        files: ['**/*.mjs', '**/*.ts?(x)'],
        extends: [
            ...tseslintConfigs.recommended,
            ...tseslintConfigs.stylistic,
        ],
        // only needed if you use TypeChecked rules
        languageOptions: {
            parserOptions: {
                // https://typescript-eslint.io/getting-started/typed-linting
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
    },
)

const importConfig = [
    {
        name: 'custom/import/config',
        plugins: {
            'import': importPlugin,
        },
        rules: {
            ...importPlugin.configs.recommended.rules,
            'import/no-anonymous-default-export': 'warn',
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true
                }
            },
        },
    },
]

const mdxConfig = [
    // https://github.com/mdx-js/eslint-mdx/blob/d6fc093fb32ab58fb226e8cf42ac77399b8a4758/README.md#flat-config
    {
        name: 'custom/mdx/recommended',
        files: ['**/*.mdx'],
        ...mdxPlugin.flat,
        processor: mdxPlugin.createRemarkProcessor({
            // I disabled linting code blocks
            // as I was having performance issues
            lintCodeBlocks: false,
            languageMapper: {},
        }),
    },
    {
        name: 'custom/mdx/code-blocks',
        files: ['**/*.mdx'],
        ...mdxPlugin.flatCodeBlocks,
        rules: {
            ...mdxPlugin.flatCodeBlocks.rules,
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
]

const config = [
    ...ignoresConfig,
    ...eslintConfig,
    ...tseslintConfig,
    ...importConfig,
    ...mdxConfig,
];

export default config