import { ESLINT_IGNORE, ESLINT_LIB_CONFIG, ESLINT_LIB_PLUGINS_ARRAY } from './eslint.mjs';

export default [
  ESLINT_IGNORE,
  ...ESLINT_LIB_PLUGINS_ARRAY,
  ESLINT_LIB_CONFIG,
];