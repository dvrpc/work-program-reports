// @ts-check

import eslint from "@eslint/js";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

export default tseslint.config(
  {
    ignores: ["*", "*/", "!src/"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
    },
  },
  {
    files: ["./*"],
    ignores: ["*/"],
    extends: [tseslint.configs.disableTypeChecked],
  }
);
