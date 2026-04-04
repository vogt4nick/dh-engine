import js from "@eslint/js";
import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist", "daggerheart-srd", "coverage"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      jsxA11y.flatConfigs.recommended,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      unicorn.configs.all,
    ],
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: { version: "detect" },
    },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            e: false, // allow `e` for event parameters
            prev: false, // allow `prev` in setState callbacks
          },
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "no-console": "error",
      eqeqeq: "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message:
            "Inline styles are forbidden. Use CSS modules or a design token.",
        },
        {
          selector:
            "Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
          message:
            "Hardcoded color values are forbidden. Import from a theme/token file.",
        },
      ],
    },
  },
  {
    // .ts files use kebab-case
    files: ["**/*.ts"],
    rules: {
      "unicorn/filename-case": ["error", { cases: { kebabCase: true } }],
    },
  },
  {
    // tsx files use PascalCase (React component convention)
    files: ["**/*.tsx"],
    rules: {
      "unicorn/filename-case": ["error", { cases: { pascalCase: true } }],
    },
  },
  {
    // main.tsx is a Vite entry point and cannot be renamed
    files: ["src/main.tsx"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
  {
    // Engine files must not depend on React or the DOM
    files: ["src/engine/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react", "react-dom", "react/*"],
              message:
                "Engine files must not import React. Move UI logic to src/components or src/hooks.",
            },
          ],
        },
      ],
    },
  },
  {
    // Test files: relax rules that are too strict for test code
    files: ["tests/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "unicorn/no-null": "off",
    },
  },
  {
    // Node config files (vite, playwright) use tsconfig.node.json
    files: ["vite.config.ts", "playwright.config.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
  {
    // Test files use a tsconfig that includes the tests/ directory
    files: ["tests/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.test.json",
      },
    },
  },
);
