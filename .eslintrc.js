module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'filenames', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'no-shadow': 'off'
  },
  globals: {
    LOCAL: true
  },
  env: {
    'jest/globals': true
  }
};
