if (!process.env.STAGE) throw Error('Missing required env var STAGE');

if (process.env.STAGE === 'prod') {
  console.log('\n\x1b[33m*** YOU ARE TESTING IN PROD ***\n\x1b[0m');
}

module.exports = {
  reporters: ['default', './reporter.js'],
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.csv$': './jest-csv-transformer.js',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
