module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'filenames', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'filenames/match-regex': [2, '^[a-z-.]+$', true]
  },
  globals: {
    LOCAL: true
  },
  env: {
    'jest/globals': true
  }
};
