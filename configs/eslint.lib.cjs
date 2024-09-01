module.exports = {
    root: true,
    env: { browser: false, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['unused-imports', 'simple-import-sort', 'prettier', 'budapestian'],
    rules: {
        'prettier/prettier': ['error', {
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 4,
        }],

        'no-unused-vars': 'off',
        "object-shorthand": ["error", "always"],
        "budapestian/global-constant-pattern": [
            "error",
            { "exceptions": ["π", "e"] }
        ],

        'import/no-unresolved': 'off',
        'import/no-default-export': 'error',
        'unused-imports/no-unused-imports': 'error',
        'simple-import-sort/imports': 'error',

        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
                prefix: ['T', 'With', 'Extract'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I'],
            },
            {
                selector: 'enum',
                format: ['PascalCase'],
                prefix: ['E'],
            },
        ],

        'no-debugger': 'error',

        "import/extensions": [
            'error',
            'never'
        ]
    }
}
