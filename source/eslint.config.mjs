import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  pluginJs.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.js"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.jquery,
      },
    },
    rules: {
      "prettier/prettier": "error",
      "one-var": ["error", "never"],
      semi: ["error", "always"],
      "no-sequences": "error",
      "no-unused-expressions": "error",
      "padding-line-between-statements": [
        "error",
        // Add a blank line before variable declarations
        { blankLine: "never", prev: ["const"], next: ["const"] },
        { blankLine: "never", prev: ["let"], next: ["let"] },
        { blankLine: "never", prev: ["var"], next: ["var"] },
        // Add a blank line after variable declarations when the next statement is not a variable declaration
        // { blankLine: "always", prev: ["const"], next: ["!const"] },
      ],
    },
  },
];
