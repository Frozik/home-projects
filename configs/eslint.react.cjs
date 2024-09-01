const libRules = require('./eslint.lib.cjs');

module.exports = {
    ...libRules,
    env: { browser: true, es2020: true },
    extends: [
        ...libRules.extends,
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    plugins: [
        ...libRules.plugins,
        'react-refresh',
    ],
    rules: {
        ...libRules.rules,

        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],

        'react/display-name': 'off',
        'react/jsx-boolean-value': ['error', 'never'],
        'react/prop-types': 'off',
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        react: {
            version: 'detect',
        },
    }
};
