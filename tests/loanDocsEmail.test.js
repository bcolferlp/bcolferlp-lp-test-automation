/* eslint-disable global-require */
/* eslint-disable guard-for-in */
import BaseTest from '../src/base/baseTest';
import LoanEmailPage from '../src/pages/loanEmailPage';
import RequestLoanDocsPage from '../src/pages/requestLoanDocsPage';
import DocuSignPage from '../src/pages/3rdParty/docuSign/docuSignPage';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

const { _ } = require('../src/utilities/imports');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };
const coboConfig = { user: process.env.coboUser, password: process.env.emailPass };

jest.setTimeout(300000);

describe('Loan Docs Email', () => {
  // initialize values
  let email;
  let inbox;
  let coboEmail;
  let coboInbox;
  let baseTest;
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();
  const allNonSunRunLoans = _.concat([], loanSingleBorrNonSunRun, loanCoBorrNonSunRun);
  const allLoans = _.concat([], loanSingleBorrSunRun, loanSingleBorrNonSunRun, loanCoBorrSunRun, loanCoBorrNonSunRun);
  const allCoboLoans = _.concat([], loanCoBorrSunRun, loanCoBorrNonSunRun);

  // Instantiate borrower and coborrower emails
  beforeAll(() => {
    email = new LoanEmailPage(emailConfig);
    coboEmail = new LoanEmailPage(coboConfig);
  });

  // Request Loans
  describe('Request Loans', () => {
    beforeEach(async () => {
      inbox = await email.getInbox();
      baseTest = new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    // Request: NonSunRun loans
    test.each(allNonSunRunLoans)(
      '75902: Request loan docs for all NonSunRun loans',
      async borrower => {
        console.log(`Requesting loan docs for NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const requestLoanDocsLink = await email.getLoanDocsLink(inbox, borrower);

        // Launch the Request Loan Docs page
        const requestLoanDocsPage = new RequestLoanDocsPage(baseTest.webDriver);
        await requestLoanDocsPage.requestDocuments(requestLoanDocsLink);
      },
      300000
    );
  });

  // Sign Loan Docs
  describe('Sign Loan Docs', () => {
    beforeEach(async () => {
      inbox = await email.getInbox();
      coboInbox = await coboEmail.getInbox();
      baseTest = await new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    // Sign: Primary Borrower for Single and CoBo loans
    test.each(allLoans)(
      '75903: Sign loan docs for Primary Borrowers',
      async borrower => {
        console.log(`Signing loan docs for Primary Borrower: ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );

    // Sign: Secondary Borrowers
    test.each(allCoboLoans)(
      '75904: Sign loan docs for Secondary Borrowers',
      async borrower => {
        console.log(`Signing loan docs for Secondary Borrower: ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const coboDocuSignLink = await coboEmail.getDocuSignLink(coboInbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(coboDocuSignLink);
      },
      300000
    );
  });
});
