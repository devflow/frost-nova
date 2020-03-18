module.exports = {
  root: true,
  "ignorePatterns": ["src/libs/", "node_modules/"],
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [2, {"args": "after-used", "argsIgnorePattern": "^_"}],
  },
}
