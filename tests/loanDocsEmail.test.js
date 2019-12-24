/* eslint-disable global-require */
/* eslint-disable guard-for-in */
import BaseTest from '../src/base/baseTest';
import LoanEmailPage from '../src/pages/loanEmailPage';
import RequestLoanDocsPage from '../src/pages/requestLoanDocsPage';
import DocuSignPage from '../src/pages/3rdParty/docuSign/docuSignPage';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

// require('dotenv').config();

const { fs, path } = require('../src/utilities/imports');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };
jest.setTimeout(300000);
describe('Loan Docs Email', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();
  describe('SunRun Single Borrower', () => {
    let email;
    let inbox;
    let baseTest;

    beforeAll(async () => {
      email = new LoanEmailPage(emailConfig);
    });

    beforeEach(async () => {
      inbox = await email.getInbox();
      baseTest = await new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    test.each(loanSingleBorrSunRun)(
      'Request loan docs for SunRun',
      async borrower => {
        console.log(`Requesting loan docs for ${borrower.loanId}, ${borrower.firstName}, ${borrower.language}`);

        // Return link from headless email message
        const requestLoanDocsLink = await email.getLoanDocsLink(inbox, borrower);

        // Launch the Request Loan Docs page
        const requestLoanDocsPage = new RequestLoanDocsPage(baseTest.webDriver);
        await requestLoanDocsPage.requestDocuments(requestLoanDocsLink);
      },
      300000
    );
    test.each(loanSingleBorrSunRun)(
      'Sign loan docs for SunRun',
      async borrower => {
        console.log(`Signing loan docs for ${borrower.loanId}, ${borrower.firstName}`);

        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );
  });
  describe('SunRun CoBorrower', () => {});
  describe('NonSunRun Single Borrower', () => {
    let email;
    let inbox;
    let baseTest;

    beforeAll(async () => {
      email = new LoanEmailPage(emailConfig);
    });

    beforeEach(async () => {
      inbox = await email.getInbox();
      baseTest = await new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    test.each(loanSingleBorrNonSunRun)(
      'Request loan docs for NonSunRun',
      async borrower => {
        console.log(`Requesting loan docs for ${borrower.loanId}, ${borrower.firstName}, ${borrower.language}`);

        // Return link from headless email message
        const requestLoanDocsLink = await email.getLoanDocsLink(inbox, borrower);

        // Launch the Request Loan Docs page
        const requestLoanDocsPage = new RequestLoanDocsPage(baseTest.webDriver);
        await requestLoanDocsPage.requestDocuments(requestLoanDocsLink);
      },
      300000
    );
    test.each(loanSingleBorrNonSunRun)(
      'Sign loan docs for NonSunRun',
      async borrower => {
        console.log(`Signing loan docs for ${borrower.loanId}, ${borrower.firstName}`);
        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );
  });
  describe('NonSunRun CoBorrower', () => {});
});
