module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  overrides: [
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'linebreak-style': 0,  
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-multiple-empty-lines": [2, {"max": 99999, "maxEOF": 0}]
  }
}
