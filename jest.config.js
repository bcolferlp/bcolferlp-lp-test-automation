/* eslint-disable camelcase */
// const _ = require('lodash');
// const testRailConfig = require('./testRailconfig');

// let project_id = null;
// let suite_id = null;
// let argChosen;
// const args = process.argv;
// args.forEach(arg => {
//   const attribute = _.find(testRailConfig, arg);
//   if (attribute !== undefined) {
//     const config = _.find(attribute, 'active');
//     if (config) argChosen = config;
//   }
// });
// if (argChosen) {
//   const { trProject = '', trSuite = '' } = argChosen;
//   console.log(`#onRunStart: Project ${trProject}, Suite ${trSuite}`);
//   project_id = trProject;
//   suite_id = trSuite;
// } else console.log('Verified: No TestRail suite chosen');

module.exports = {
  reporters: ['default', './my-custom-reporter.js'],
  // reporters: ['default', ['jest-2-testrail', { project_id, suite_id }]],
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testEnvironment: 'node'
};
