module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-prettier", "eslint-plugin-import"],
  extends: [
    // Airbnb style guide 적용
    "airbnb-base",
    // TypeScript ESLint recommanded style 적용
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-return-await": "off",
  },
};
