const reactRules = require('../../configs/eslint.react.cjs');

module.exports = {
    ...reactRules,
    extends: [
        ...reactRules.extends,
        'plugin:storybook/recommended',
    ],
    overrides: [
        {
            files: [
                'src/stories/**/*.stories.js',
                'src/stories/**/*.stories.ts',
                'src/stories/**/*.stories.jsx',
                'src/stories/**/*.stories.tsx',
            ],
            rules: {
                'import/no-default-export': ['off']
            }
        }
    ]
};
