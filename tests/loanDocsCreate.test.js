import each from 'jest-each';
import LoanAPI from '../src/apis/loanAPI';
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON';
import CoBorrowerJSON from '../src/utilities/coBorrowerJSON';
// import { longStackTraces } from 'bluebird';

const { fs, path } = require('../src/utilities/imports');
const TestNumber = require('../src/utilities/testNumber');
const singleBorrSunRunData = require('../data/loanDocs/testData/singleBorrowerSunRunData');
const singleBorrNonSunRunData = require('../data/loanDocs/testData/singleBorrowerNonSunRunData');
//const coBorrSunRunData = require('../data/loanDocs/testData/coBorrowerSunRunData');
const coBorrSunRunData = require('../data/loanDocs/testData/joseTestData/coBorrowerSunRunDataJose');
const coBorrNonSunRunData = require('../data/loanDocs/testData/coBorrowerNonSunRunData');

const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');

// create file loanids
const loanSingleBorrSunRun = [];
const loanSingleBorrNoSunRun = [];
const loanCoBorrSunRun = [];
const loanCoBorrNonSunRun = [];
describe('Create Loans', () => {
  let testNumber;
  beforeAll(() => {
    // testNumber format yyyymmddhhmmss
    testNumber = new TestNumber().getTestNumber();
    // Create folder <testnumber> in results directory
    fs.mkdirSync(`${folderResults}${testNumber}`);
    // write testNumber on file latestTestNumber.txt in results folder
    fs.writeFileSync(`${folderResults}latestTestNumber.txt`, testNumber);
  });

  each(singleBorrSunRunData).test('Create Single Borrower SunRun Loans',
    async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
      const jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, testNumber);
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

  each(singleBorrNonSunRunData).test('Create Single Borrower Non SunRun Loans',
    async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
      const jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, testNumber);
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

  each(coBorrSunRunData).test.skip('create Combined SunRun Loans',
    async ({productType,clientId,firstName,lastName,street,state,email,spokenLanguage,source,salesRepEmail,coFirstName,coLastName,coStreet,coState,coEmail}, done) => {
      const jsonData = new CoBorrowerJSON().updateJson(productType,clientId,firstName,lastName,street,state,email,spokenLanguage,
        source,salesRepEmail,coFirstName,coLastName,coStreet,coState,coEmail,testNumber);
      // create Loan
      const loan = new LoanAPI(jsonData);
      const loanStatus = await loan.getLoanStatus();
      expect(loanStatus).toBe('Approved');
      const loanId = await loan.getLoanId();
      loanCoBorrSunRun.push({ loanId, firstName, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanCoBorrSunRun.json`, JSON.stringify(loanCoBorrSunRun));
      done();
    },
    10000
  );

  each(coBorrNonSunRunData).test.skip('create Combined Non SunRun Loans',
    async ({productType,clientId,firstName,lastName,street,state,email,spokenLanguage,source,salesRepEmail,coFirstName,coLastName,coStreet,coState,coEmail}, done) => {
      const jsonData = new CoBorrowerJSON().updateJson(productType,clientId,firstName,lastName,street,state,email,spokenLanguage,source,salesRepEmail,coFirstName,coLastName,coStreet,coState,coEmail,testNumber);
      // create Loan
      const loan = new LoanAPI(jsonData);
      const loanStatus = await loan.getLoanStatus();
      expect(loanStatus).toBe('Approved');
      const loanId = await loan.getLoanId();
      loanCoBorrNonSunRun.push({ loanId, firstName, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanCoBorrNonSunRun.json`, JSON.stringify(loanCoBorrNonSunRun));
      done();
    },
    10000
  );
});
