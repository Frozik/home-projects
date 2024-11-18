import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

import reactRules from '../../configs/eslint.react.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
  ...reactRules,
  ...fixupConfigRules(compat.extends(
    'plugin:storybook/recommended',
  )).map(config => ({
      ...config,
      files: ["src/stories/**/*.ts", "src/stories/**/*.tsx"],
  }))
];
