/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
require('dotenv').config();
const _ = require('lodash');
const TestRail = require('testrail-api');
const stripAnsi = require('strip-ansi');

// Initialize testrail credentials
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

  // Method that run after jest test suite
  async onTestResult(test, testResult, aggregatedResult) {
    let trRunId;
    const runsToClose = [];
    const { testResults } = testResult;

    // Reduce results to only include valid case_ids with messages, if applicable
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

    // Only runs if case results are populated
    if (Object.keys(caseResults).length > 0) {
      console.log('Test Results');

      // Iterates through each result
      const casePromises = Object.entries(caseResults).map(async ([caseId, item], i) => {
        // Gather failures, if applicable
        let existingTest;
        const { results, failureMessages } = item;
        const failed = results.findIndex(r => r === 5) > -1;
        const comment = stripAnsi(`${caseResults[caseId].fullName}\n\n${failureMessages.join('\n')}`);
        try {
          const caseReponse = await testrail.getCase(caseId);
          const suiteResponse = await testrail.getSuite(caseReponse.body.suite_id);
          const date = new Date().toLocaleString();

          // Returns any existing runs
          const runs = await testrail.getRuns(
            /*PROJECT_ID=*/ suiteResponse.body.project_id,
            /*FILTERS=*/ { is_completed: 0, suite_id: caseReponse.body.suite_id }
          );

          if (runs) {
            // Iterates through potential pre-existing runs
            for (const item of runs.body) {
              const r = await testrail.getTests(item.id, {});
              existingTest = r.body.find(i => i.case_id === +caseId);
            }
          }
          // Determine if a test already exists
          if (!existingTest) {
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
            console.log('Adding run:', trRunId);
            const { body } = await testrail.getTests(/*RUN_ID=*/ trRunId, /*FILTERS=*/ {});
            const caseNum = +caseId;
            const testrailRun = body.find(tr => tr.case_id === caseNum);

            // Add a result once a testrun is found
            if (testrailRun) {
              console.log('Adding result:', testrailRun.id);
              await testrail.addResult(/*TEST_ID=*/ testrailRun.id, /*CONTENT=*/ { status_id: failed ? 5 : 1, comment });
            }
          } else {
            // Add a result to an existing run
            console.log('Adding result to existing run:', existingTest.id);
            runsToClose.push(existingTest.run_id);
            await testrail.addResult(/*TEST_ID=*/ existingTest.id, /*CONTENT=*/ { status_id: failed ? 5 : 1, comment });
          }
        } catch (e) {
          if (!_.has(e, 'message.error') && !_.has(e, 'response.request.href')) return console.error('ERROR:', e);
          console.error('ERROR MESSAGE:', e.message.error);
          console.error('ERROR REQUEST:', e.response.request.href);
        }
      });
      await Promise.all(casePromises);

      // Close the runs
      const closePromises = runsToClose.map(async runId => {
        try {
          console.log('Closing run:', runId);
          await testrail.closeRun(runId);
        } catch (e) {
          if (!_.has(e, 'message.error')) return console.error('ERROR:', e);
          console.error('ERROR MESSAGE:', e.message.error);
        }
      });
      await Promise.all(closePromises);
    }
  }
}

module.exports = MyCustomReporter;
