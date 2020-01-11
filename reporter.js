/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
require('dotenv').config();
const _ = require('lodash');
const TestRail = require('testrail-api');

const testrail = new TestRail({
  host: process.env.trHost,
  user: process.env.trUser,
  password: process.env.trPassword
});

class MyCustomReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  async onTestResult(test, testResult, aggregatedResult) {
    let trRunId;
    const runsToClose = [];
    const { testResults } = testResult;

    const caseResults = testResults.reduce((acc, testResult) => {
      const { fullName, title, status, failureMessages } = testResult;
      if (status !== 'pending') {
        if (title.includes(':')) {
          const caseId = title.split(':')[0].trim();
          const caseName = title.split(':')[1].trim();
          const sendStatus = status === 'passed' ? 1 : status === 'failed' ? 5 : 3;
          const key = caseId;
          if (acc[key]) {
            acc[key].fullName = fullName;
            acc[key].caseName = caseName;
            acc[key].results.push(sendStatus);
            acc[key].failureMessages = acc[key].failureMessages.concat(failureMessages);
          } else {
            acc[key] = { fullName, caseName, results: [sendStatus], failureMessages };
          }
        }
      }
      return acc;
    }, {});

    if (Object.keys(caseResults).length > 0) {
      console.log('Test Results');
      const casePromises = Object.entries(caseResults).map(async ([caseId, item], i) => {
        try {
          const caseReponse = await testrail.getCase(caseId);
          const suiteResponse = await testrail.getSuite(caseReponse.body.suite_id);
          const date = new Date().toLocaleString();
          const runResponse = await testrail.addRun(
            /*PROJECT_ID=*/ suiteResponse.body.project_id,
            /*CONTENT=*/ {
              suite_id: caseReponse.body.suite_id,
              name: `${caseResults[caseId].caseName} (${date})`,
              include_all: false,
              case_ids: Object.keys(caseResults)
                .filter(c => c === caseId)
                .map(c => +c)
            }
          );
          trRunId = runResponse.body.id;
          runsToClose.push(trRunId);
          console.log('Adding Run:', trRunId);
          const { body } = await testrail.getTests(/*RUN_ID=*/ trRunId, /*FILTERS=*/ {});
          const { results, failureMessages } = item;
          const caseNum = +caseId;
          const failed = results.findIndex(r => r === 5) > -1;
          const testrailRun = body.find(tr => tr.case_id === caseNum);

          if (testrailRun) {
            console.log('Add Result:', testrailRun.id);
            await testrail.addResult(
              /*TEST_ID=*/ testrailRun.id,
              /*CONTENT=*/ { status_id: failed ? 5 : 1, comment: `${caseResults[caseId].fullName}\n\n${failureMessages.join('\n')}` }
            );
          }
        } catch (e) {
          console.error('ERROR:', e.message.error);
          console.error('ERROR:', e.response.request.href);
        }
      });
      await Promise.all(casePromises);

      // Close the runs
      const closePromises = runsToClose.map(async runId => {
        try {
          console.log('Closing run:', runId);
          await testrail.closeRun(runId);
        } catch (e) {
          console.error('ERROR:', e.message.error);
        }
      });
      await Promise.all(closePromises);
    }
  }
}

module.exports = MyCustomReporter;
