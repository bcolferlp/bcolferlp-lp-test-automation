/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
require('dotenv').config();
const _ = require('lodash');
const TestRail = require('testrail-api');
const testRailConfig = require('./testRailconfig');

let argChosen;
const args = process.argv;
args.forEach(arg => {
  const attribute = _.find(testRailConfig, arg);
  if (attribute !== undefined) {
    const config = _.find(attribute, 'active');
    if (config) argChosen = config;
  }
});

const testrail = new TestRail({
  host: process.env.trHost,
  user: process.env.trUser,
  password: process.env.trPassword
});

let trRunId;

class MyCustomReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  async onTestResult(test, testResult, aggregatedResult) {
    if (argChosen) {
      console.log('onTestResult:');
      // console.log('test: ', test);
      // console.log('testResult: ', testResult);
      // console.log('aggregatedResult: ', aggregatedResult);
      const { testResults } = testResult;
      const { body } = await testrail.getTests(/*RUN_ID=*/ trRunId, /*FILTERS=*/ {});
      // console.log('testResponse', body);
      const promises = testResults.map(item => {
        // console.log(item, 'item');
        const { title, status } = item;
        const sendStatus = status === 'passed' ? 1 : status === 'failed' ? 5 : 3;
        return new Promise((resolve, reject) => {
          return body.map(async bodyItem => {
            if (bodyItem.title === title) {
              // console.log('MATCH', bodyItem);
              try {
                const resultResponse = await testrail.addResult(/*TEST_ID=*/ bodyItem.id, /*CONTENT=*/ { status_id: sendStatus });
                if (resultResponse) resolve();
              } catch (e) {
                reject();
              }
            }
          });
        });
      });
      await Promise.all(promises);
      if (trRunId) await testrail.closeRun(trRunId);
    }
  }

  async onRunStart(results, options) {
    if (argChosen) {
      const { trProject = '', trSuite = '' } = argChosen;
      console.log(`onRunStart: Project ${trProject}, Suite ${trSuite}`);
      const runResponse = await testrail.addRun(/*PROJECT_ID=*/ trProject, /*CONTENT=*/ { suite_id: trSuite, name: `Create loans` });
      trRunId = runResponse.body.id;
      // console.log('trRunId', results);
      // console.log('results: ', results);
      // console.log('Options: ', options);
    } else console.log('No TestRail suite chosen');
  }
}

module.exports = MyCustomReporter;
