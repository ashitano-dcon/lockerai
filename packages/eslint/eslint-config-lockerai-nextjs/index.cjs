/** @type {import('eslint').Linter.Config} */
module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  extends: ["next", "lockerai-react"],
  overrides: [
    {
      files: ["./*"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-default-export": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["./src/app/**"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
        "react/prop-types": "off",
      },
    },
    {
      files: ["./src/app/**/json-ld.ts"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["./src/app/**/route.ts"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["./src/app/api/**", "./src/pages/api/**"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["./**/*.story.*"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "off",
      },
    },
  ],
};
