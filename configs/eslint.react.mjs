import { fixupConfigRules } from "@eslint/compat";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-plugin-prettier";
import budapestian from "eslint-plugin-budapestian";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist", "**/.eslintrc.cjs", "coverage/**/*.*", "dist/**/*.*", "public/**/*.*", "coverage/**/*.*"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
)).map(config => ({
    ...config,
    files: ["src/**/*.ts", "src/**/*.tsx"],
})), {
    files: ["src/**/*.ts", "src/**/*.tsx"],

    plugins: {
        "unused-imports": unusedImports,
        "simple-import-sort": simpleImportSort,
        prettier,
        budapestian,
        "react-refresh": reactRefresh,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "prettier/prettier": ["error", {
            semi: true,
            trailingComma: "all",
            singleQuote: true,
            printWidth: 100,
            tabWidth: 4,
        }],

        "no-unused-vars": "off",
        "object-shorthand": ["error", "always"],

        "budapestian/global-constant-pattern": ["error", {
            exceptions: ["π", "e"],
        }],

        "import/no-unresolved": "off",
        "import/no-default-export": "error",
        // "import/no-cycle": "error",
        "unused-imports/no-unused-imports": "error",
        "simple-import-sort/imports": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-imports": "error",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "typeAlias",
            format: ["PascalCase"],
            prefix: ["T", "With", "Extract"],
        }, {
            selector: "interface",
            format: ["PascalCase"],
            prefix: ["I"],
        }, {
            selector: "enum",
            format: ["PascalCase"],
            prefix: ["E"],
        }],

        "no-debugger": "error",
        "import/extensions": ["error", "never"],

        "react-refresh/only-export-components": ["warn", {
            allowConstantExport: true,
        }],

        "react/display-name": "off",
        "react/jsx-boolean-value": ["error", "never"],
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
    },
}];