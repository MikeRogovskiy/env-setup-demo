module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  plugins: ["jest", "@typescript-eslint"],
  extends: ["airbnb-base", "prettier", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "max-len": [
      "error",
      { code: 100, ignoreComments: true, ignoreStrings: true },
    ],
    "import/prefer-default-export": "OFF",
    // 'eslint no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    "no-underscore-dangle": "OFF",
  },
};
