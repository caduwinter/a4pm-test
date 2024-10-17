import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["backend/**/**/*.ts", "backend/**/*.ts"] },
  {
    files: ["frontend/**/*.ts", "frontend/**/*.jsx"],
  },
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
];
