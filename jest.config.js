module.exports = {
  reporters: ['default', './my-custom-reporter.js'],
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testEnvironment: 'node'
};
