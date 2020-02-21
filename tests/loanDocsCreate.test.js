import each from 'jest-each';
import LoanAPI from '../src/apis/loanAPI';
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON';
import CoBorrowerJSON from '../src/utilities/coBorrowerJSON';
// import { longStackTraces } from 'bluebird';

const { fs, path, getRandomNum } = require('../src/utilities/imports');
const TestNumber = require('../src/utilities/testNumber');
const singleBorrSunRunData = require('../data/loanDocs/testData/singleBorrowerSunRunData');
const singleBorrNonSunRunData = require('../data/loanDocs/testData/singleBorrowerNonSunRunData');
const coBorrSunRunData = require('../data/loanDocs/testData/coBorrowerSunRunData');
const coBorrNonSunRunData = require('../data/loanDocs/testData/coBorrowerNonSunRunData');

const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');

jest.setTimeout(300000);
// create file loanids
const loanSingleBorrSunRun = [];
const loanSingleBorrNoSunRun = [];
const loanCoBorrSunRun = [];
const loanCoBorrNonSunRun = [];

describe('Create Loans', () => {
  let testNumber;
  beforeAll(async () => {
    // testNumber format yyyymmddhhmmss
    testNumber = new TestNumber().getTestNumber();
    // Create folder <testnumber> in results directory
    fs.mkdirSync(`${folderResults}${testNumber}`);
    // write testNumber on file latestTestNumber.txt in results folder
    fs.writeFileSync(`${folderResults}latestTestNumber.txt`, testNumber);
  });

  each(singleBorrSunRunData).test(
    '75898: Create Single Borrower SunRun Loans',
    async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
      const jsonData = new SingleBorrowerJSON().updateJson(
        productType,
        clientId,
        firstName,
        lastName,
        getRandomNum(4) + street,
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
      loanSingleBorrSunRun.push({ loanId, firstName, spokenLanguage });
      fs.writeFileSync(`${folderResults}${testNumber}/loanSingleBorrSunRun.json`, JSON.stringify(loanSingleBorrSunRun));

      done();
    },
    10000
  );

  each(singleBorrNonSunRunData).test(
    '75899: Create Single Borrower Non SunRun Loans',
    async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
      const jsonData = new SingleBorrowerJSON().updateJson(
        productType,
        clientId,
        firstName,
        lastName,
        getRandomNum(4) + street,
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
    '75900: Create Combined SunRun Loans',
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
        getRandomNum(4) + street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        coFirstName,
        coLastName,
        getRandomNum(4) + coStreet,
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
    '75901: Create Combined Non SunRun Loans',
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
        getRandomNum(4) + street,
        state,
        email,
        spokenLanguage,
        source,
        salesRepEmail,
        coFirstName,
        coLastName,
        getRandomNum(4) + coStreet,
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
