import each from 'jest-each';
import LoanAPI from '../src/apis/loanAPI';
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON';
import CoBorrowerJSON from '../src/utilities/coBorrowerJSON';
// import { longStackTraces } from 'bluebird';

const TestRail = require('testrail-api');
const { fs, path } = require('../src/utilities/imports');
const TestNumber = require('../src/utilities/testNumber');
const singleBorrSunRunData = require('../data/loanDocs/testData/singleBorrowerSunRunData');
const singleBorrNonSunRunData = require('../data/loanDocs/testData/singleBorrowerNonSunRunData');
const coBorrSunRunData = require('../data/loanDocs/testData/coBorrowerSunRunData');
const coBorrNonSunRunData = require('../data/loanDocs/testData/coBorrowerNonSunRunData');

const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');

const testrail = new TestRail({
  host: process.env.trHost,
  user: process.env.trUser,
  password: process.env.trPassword
});
jest.setTimeout(300000);
// create file loanids
const loanSingleBorrSunRun = [];
const loanSingleBorrNoSunRun = [];
const loanCoBorrSunRun = [];
const loanCoBorrNonSunRun = [];
const trProject = 30;
const trSuite = 1827;
describe('Create Loans', () => {
  let testNumber;
  let runResponse;
  let trRunId;
  beforeAll(async () => {
    runResponse = await testrail.addRun(/*PROJECT_ID=*/ trProject, /*CONTENT=*/ { suite_id: trSuite, name: `Create loans` });
    trRunId = runResponse.body.id;
    expect(runResponse).toBeTruthy();
    // testNumber format yyyymmddhhmmss
    testNumber = new TestNumber().getTestNumber();
    // Create folder <testnumber> in results directory
    fs.mkdirSync(`${folderResults}${testNumber}`);
    // write testNumber on file latestTestNumber.txt in results folder
    fs.writeFileSync(`${folderResults}latestTestNumber.txt`, testNumber);
  });
  afterEach(async results => {
    console.log('results', results);
    // const resultResponse = await testrail.addResult(/*TEST_ID=*/ trTestId, /*CONTENT=*/ { status_id: 1 });
    // expect(resultResponse).toBeTruthy();
  });
  afterAll(async () => {
    const trClose = await testrail.closeRun(trRunId);
    expect(trClose).toBeTruthy();
  });
  test.only('This is only a test', () => {
    const testResponse = {
      body: [
        {
          id: 1,
          title: 'Test conditional formatting with basic value range'
        },
        {
          id: 2,
          title: 'Verify line spacing on multi-page document'
        },
        {
          id: 3,
          title: 'Create Single Borrower SunRun Loans'
        }
      ]
    };
    const trTest = testResponse.body.filter(item => item.title.includes('Create Single Borrower SunRun Loans')).map(item => item.id);
    expect(trTest).toBeTruthy();
    // console.log(trTest);
  });
  each(singleBorrSunRunData).test(
    'Create Single Borrower SunRun Loans',
    async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
      const jsonData = new SingleBorrowerJSON().updateJson(
        productType,
        clientId,
        firstName,
        lastName,
        street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        testNumber
      );

      const testResponse = await testrail.getTests(/*RUN_ID=*/ trRunId, /*FILTERS=*/ {});
      expect(testResponse).toBeTruthy();
      const trTest = testResponse.body.filter(item => item.title.includes('Create Single Borrower SunRun Loans')).map(item => item.id);
      const trTestId = trTest[0];
      // create Loan
      const loan = new LoanAPI(jsonData);
      const loanStatus = await loan.getLoanStatus();
      expect(loanStatus).toBe('Approved');
      const loanId = await loan.getLoanId();
      loanSingleBorrSunRun.push({ loanId, firstName, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanSingleBorrSunRun.json`, JSON.stringify(loanSingleBorrSunRun));

      done();
    },
    10000
  );

  each(singleBorrNonSunRunData).test(
    'Create Single Borrower Non SunRun Loans',
    async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
      const jsonData = new SingleBorrowerJSON().updateJson(
        productType,
        clientId,
        firstName,
        lastName,
        street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        testNumber
      );
      // create Loan
      const loan = new LoanAPI(jsonData);
      const loanStatus = await loan.getLoanStatus();
      expect(loanStatus).toBe('Approved');
      const loanId = await loan.getLoanId();
      loanSingleBorrNoSunRun.push({ loanId, firstName, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanSingleBorrNonSunRun.json`, JSON.stringify(loanSingleBorrNoSunRun));
      done();
    },
    10000
  );

  each(coBorrSunRunData).test(
    'create Combined SunRun Loans',
    async (
      {
        productType,
        clientId,
        firstName,
        lastName,
        street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        coFirstName,
        coLastName,
        coStreet,
        coState,
        coEmail
      },
      done
    ) => {
      const jsonData = new CoBorrowerJSON().updateJson(
        productType,
        clientId,
        firstName,
        lastName,
        street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        coFirstName,
        coLastName,
        coStreet,
        coState,
        coEmail,
        testNumber
      );
      // create Loan
      const loan = new LoanAPI(jsonData);
      const loanStatus = await loan.getLoanStatus();
      expect(loanStatus).toBe('Approved');
      const loanId = await loan.getLoanId();
      loanCoBorrSunRun.push({ loanId, firstName: `${firstName} & ${coFirstName}`, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanCoBorrSunRun.json`, JSON.stringify(loanCoBorrSunRun));
      done();
    },
    10000
  );

  each(coBorrNonSunRunData).test(
    'create Combined Non SunRun Loans',
    async (
      {
        productType,
        clientId,
        firstName,
        lastName,
        street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        coFirstName,
        coLastName,
        coStreet,
        coState,
        coEmail
      },
      done
    ) => {
      const jsonData = new CoBorrowerJSON().updateJson(
        productType,
        clientId,
        firstName,
        lastName,
        street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        coFirstName,
        coLastName,
        coStreet,
        coState,
        coEmail,
        testNumber
      );
      // create Loan
      const loan = new LoanAPI(jsonData);
      const loanStatus = await loan.getLoanStatus();
      expect(loanStatus).toBe('Approved');
      const loanId = await loan.getLoanId();
      loanCoBorrNonSunRun.push({ loanId, firstName: `${firstName} & ${coFirstName}`, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanCoBorrNonSunRun.json`, JSON.stringify(loanCoBorrNonSunRun));
      done();
    },
    10000
  );
});
