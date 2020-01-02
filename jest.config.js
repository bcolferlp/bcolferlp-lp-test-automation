module.exports = {
  reporters: ['default', './test-reporter.js'],
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testEnvironment: 'node'
};
