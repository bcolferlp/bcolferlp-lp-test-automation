module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:jest/recommended', 'prettier'],
  plugins: ['react', 'prettier', 'jest'],
  parser: 'babel-eslint',
  rules: {
    'import/extensions': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['']
      }
    ],
    'no-console': 'off',
    'linebreak-style': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'class-methods-use-this': 'off',
    'func-names': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'jest/no-disabled-tests': 'off',
    'jest/no-standalone-expect': 'off',
    'no-shadow': 'off',
    'jest/expect-expect': 'off'
  },
  overrides: [
    {
      files: ['**/stories.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ],
  env: {
    jquery: true,
    browser: true
  }
};
