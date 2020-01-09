/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
// Test rail Documentation  http://docs.gurock.com/testrail-api2/start
// testrail-api https://www.npmjs.com/package/testrail-api
require('dotenv').config();
const TestRail = require('testrail-api');

const testrail = new TestRail({
  host: process.env.trHost,
  user: process.env.trUser,
  password: process.env.trPassword
});
jest.setTimeout(300000);
describe.skip('testrail api', () => {
  const project_id = 31;
  let suite_id;
  let section_id;
  let case_id;
  let run_id;
  let test_id;

  // TEST SUITE
  beforeAll(async () => {
    const response = await testrail.addSuite(
      /*PROJECT_ID=*/ project_id,
      /*CONTENT=*/ { name: 'API test suite', description: 'This is a test suite showcasing the testrail api' }
    );
    suite_id = response.body.id;
  });

  // SECTION
  test('add a section', async () => {
    // const sec = await testrail.getSections(31, { suite_id });
    console.log('add a section for suite', suite_id);
    const response = await testrail.addSection(
      /*PROJECT_ID=*/ project_id,
      /*CONTENT=*/ { suite_id, name: 'API section', description: 'Made through Testrail API' }
    );
    expect(response).toBeTruthy();
    section_id = response.body.id;
  });

  // TEST CASE
  test('add a test case', async () => {
    console.log('add a test case for section', section_id);
    const response = await testrail.addCase(
      /*SECTION_ID=*/ section_id,
      /*CONTENT=*/ { title: 'This is a test case', refs: 'Testing', custom_qa: 29, custom_po: 29, custom_devconfig: 29 }
    );
    expect(response).toBeTruthy();
    case_id = response.body.id;
  });

  // TEST RUN
  test('add a run', async () => {
    console.log('add a run for suite', suite_id);
    const response = await testrail.addRun(/*PROJECT_ID=*/ project_id, /*CONTENT=*/ { suite_id, name: 'Api Run', description: 'Adds the run through the API' });
    expect(response).toBeTruthy();
    run_id = response.body.id;
  });

  // TEST CASE LIST
  test('get a list test cases', async () => {
    console.log('get a list of test cases for', run_id);
    const response = await testrail.getTests(/*RUN_ID=*/ run_id, /*FILTERS=*/ {});
    expect(response).toBeTruthy();
    test_id = response.body[0].id;
  });

  // RESULTS
  test('add a result', async () => {
    console.log('add a result for', run_id);
    const response = await testrail.addResult(/*TEST_ID=*/ test_id, /*CONTENT=*/ { status_id: 1 });
    expect(response).toBeTruthy();
  });

  // CLOSE RUN
  test('close a run', async () => {
    console.log('closing run', run_id);
    const response = await testrail.closeRun(run_id);
    expect(response).toBeTruthy();
  });
});
