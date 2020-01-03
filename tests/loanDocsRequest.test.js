/* eslint-disable global-require */
/* eslint-disable guard-for-in */
import BaseTest from '../src/base/baseTest';
import LoanEmailPage from '../src/pages/loanEmailPage';
import RequestLoanDocsPage from '../src/pages/requestLoanDocsPage';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

const { _ } = require('../src/utilities/imports');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };

jest.setTimeout(300000);

describe('Loan Docs Email', () => {
  // initialize values
  let email;
  let inbox;
  let baseTest;
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();
  const allNonSunRunLoans = _.concat([], loanSingleBorrNonSunRun, loanCoBorrNonSunRun);

  // Instantiate borrower and coborrower emails
  beforeAll(() => {
    email = new LoanEmailPage(emailConfig);
  });

  // Request Loans
  describe('Request Loans', () => {
    beforeEach(async () => {
      inbox = await email.getInbox();
      baseTest = await new BaseTest('chrome');
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
});
