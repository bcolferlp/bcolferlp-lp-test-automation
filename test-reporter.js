/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
require('dotenv').config();
const _ = require('lodash');
const fs = require('fs');
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
    console.log('onTestResult:');
    let trRunId;
    const runsToClose = [];
    const { testResults } = testResult;

    const caseResults = testResults.reduce((acc, testResult) => {
      const { title, status, failureMessages } = testResult;
      if (title.includes(':')) {
        const caseId = title.split(':')[0].trim();
        const caseName = title.split(':')[1].trim();
        const sendStatus = status === 'passed' ? 1 : status === 'failed' ? 5 : 3;
        const key = caseId;
        if (acc[key]) {
          acc[key].caseName = caseName;
          acc[key].results.push(sendStatus);
          acc[key].failureMessages = acc[key].failureMessages.concat(failureMessages);
        } else {
          acc[key] = { caseName, results: [sendStatus], failureMessages };
        }
      }
      return acc;
    }, {});

    const casePromises = Object.keys(caseResults).map(async caseId => {
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
            case_ids: Object.keys(caseResults).map(c => +c)
          }
        );
        trRunId = runResponse.body.id;
        runsToClose.push(trRunId);
        console.log('Adding Result for run', trRunId);
        const { body } = await testrail.getTests(/*RUN_ID=*/ trRunId, /*FILTERS=*/ {});

        const addResultPromises = Object.entries(caseResults).map(async ([caseId, item], i) => {
          const { results, failureMessages } = item;

          const caseNum = +caseId;
          const failed = results.findIndex(r => r === 5) > -1;
          const testrailRun = body.find(tr => tr.case_id === caseNum);

          if (testrailRun) {
            console.log('Add Result for', testrailRun.id);
            await testrail.addResult(/*TEST_ID=*/ testrailRun.id, /*CONTENT=*/ { status_id: failed ? 5 : 1, comment: failureMessages.join('\n') });
          }
        });

        await Promise.all(addResultPromises);
      } catch (e) {
        // fs.writeFileSync('output.json', JSON.stringify(e));
        console.error('ERROR:', e.message.error);
        console.error('ERROR:', e.response.request.href);
      }
    });
    await Promise.all(casePromises);

    // Close the runs
    const closePromises = runsToClose.map(async runId => {
      try {
        console.log('closing run', runId);
        await testrail.closeRun(runId);
      } catch (e) {
        console.error(e);
      }
    });
    await Promise.all(closePromises);
  }
}

module.exports = MyCustomReporter;
