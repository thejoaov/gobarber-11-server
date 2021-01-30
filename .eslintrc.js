module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'class-methods-use-this': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
        ignoreRestSiblings: true,
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-console': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        prefix: ['I'],
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
