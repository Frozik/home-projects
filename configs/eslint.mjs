import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules } from '@eslint/compat';
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

import budapestian from "eslint-plugin-budapestian";
import prettier from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const LIB_PLUGINS = [
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:import/recommended",
  "plugin:import/typescript",
  "prettier",
];

const REACT_PLUGINS = [
  ...LIB_PLUGINS,
  "plugin:react-hooks/recommended",
  "plugin:react/recommended",
  "plugin:react/jsx-runtime",
];

export const ESLINT_IGNORE = {
  ignores: ["**/dist", "**/.eslintrc.cjs", "coverage/**/*.*", "dist/**/*.*", "public/**/*.*", "coverage/**/*.*"],
};

export const ESLINT_LIB_PLUGINS_ARRAY = fixupConfigRules(compat.extends(...LIB_PLUGINS)).map(config => ({
  ...config,
  files: ["src/**/*.ts", "src/**/*.tsx"],
}));

export const ESLINT_REACT_PLUGINS_ARRAY = fixupConfigRules(compat.extends(...REACT_PLUGINS)).map(config => ({
  ...config,
  files: ["src/**/*.ts", "src/**/*.tsx"],
}));

export const ESLINT_LIB_CONFIG = {
  files: ["src/**/*.ts", "src/**/*.tsx"],

  plugins: {
    "unused-imports": unusedImports,
    "simple-import-sort": simpleImportSort,
    prettier,
    budapestian,
  },

  languageOptions: {
    globals: {
      ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
    },

    parser: tsParser,
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
    // https://stackoverflow.com/questions/38458067/which-eslint-rules-in-my-config-are-slow
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
  },
};

export const ESLINT_REACT_CONFIG = {
  ...ESLINT_LIB_CONFIG,

  plugins: {
    ...ESLINT_LIB_CONFIG.plugins,
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
    ...ESLINT_LIB_CONFIG.rules,

    "react-refresh/only-export-components": ["warn", {
      allowConstantExport: true,
    }],

    "react/display-name": "off",
    "react/jsx-boolean-value": ["error", "never"],
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};

