/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
require('dotenv').config();
const _ = require('lodash');
const TestRail = require('testrail-api');
const testRailConfig = require('./testRailconfig');

let argChosen;
const args = process.argv;
args.forEach(arg => {
  const attribute = _.find(testRailConfig, ['name', arg]);
  // console.log('attribute', attribute);
  if (attribute !== undefined) {
    argChosen = attribute;
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

  async onRunComplete() {
    if (trRunId) {
      await testrail.closeRun(trRunId);
      console.log(`Test Run: ${trRunId} complete`);
    }
  }

  async onTestResult(test, testResult, aggregatedResult) {
    if (argChosen && trRunId) {
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
        const splitTitle = title.split(':');
        const sendStatus = status === 'passed' ? 1 : status === 'failed' ? 5 : 3;
        return new Promise((resolve, reject) => {
          return body.map(async bodyItem => {
            // console.log(bodyItem.case_id, splitTitle[0], bodyItem.case_id === splitTitle[0]);
            if (bodyItem.case_id === +splitTitle[0]) {
              // console.log('MATCH', bodyItem.id);
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
    }
  }

  async onRunStart(results, options) {
    if (argChosen) {
      const { name = '', trProject = '', trSuite = '' } = argChosen;
      console.log(`onRunStart: Project ${trProject}, Suite ${trSuite}`);
      if (!trRunId) {
        const runResponse = await testrail.addRun(/*PROJECT_ID=*/ trProject, /*CONTENT=*/ { suite_id: trSuite, name });
        trRunId = runResponse.body.id;
      }
      // console.log('trRunId', results);
      // console.log('results: ', results);
      // console.log('Options: ', options);
    } else console.log('No TestRail suite chosen');
  }
}

module.exports = MyCustomReporter;
