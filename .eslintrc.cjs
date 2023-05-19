module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // `react` first, `next` second, then packages starting with a character
              ['^react$', '^next', '^[a-z]'],
              // Packages starting with `@`
              ['^@'],
              // Packages starting with `@components`
              ['^@components'],
              // Packages starting with `@context`
              ['^@context'],
              // Packages starting with `@hooks`
              ['^@hooks'],
              // Packages starting with `@layout`
              ['^@layout'],
              // Packages starting with `@slices`
              ['^@slices'],
              // Packages starting with `@types`
              ['^@types'],
              // Packages starting with `@utils`
              ['^@utils'],
              // Packages starting with `~`
              ['^~'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Imports starting with `./`
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports
              ['^.+\\.s?css$'],
              // Side effect imports
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'no-restricted-exports': [0],
    'react/button-has-type': [0],
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: false,
        shorthandFirst: true,
        shorthandLast: false,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        locale: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'import/prefer-default-export': 'off',
  },
};
