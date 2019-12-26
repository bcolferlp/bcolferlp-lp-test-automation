/* eslint-disable global-require */
/* eslint-disable guard-for-in */
import BaseTest from '../src/base/baseTest';
import LoanEmailPage from '../src/pages/loanEmailPage';
import RequestLoanDocsPage from '../src/pages/requestLoanDocsPage';
import DocuSignPage from '../src/pages/3rdParty/docuSign/docuSignPage';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

require('dotenv').config();

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

  // Instantiate borrower and coborrower emails
  beforeAll(() => {
    email = new LoanEmailPage(emailConfig);
    coboEmail = new LoanEmailPage(coboConfig);
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

    // Request: Single Borrower Non Sun Run
    test.each(loanSingleBorrNonSunRun)(
      'Request loan docs for Single Borrower NonSunRun',
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

    // Request: Coborrower Non Sun Run
    test.each(loanCoBorrNonSunRun)(
      'Request loan docs for Coborrower NonSunRun',
      async borrower => {
        console.log(`Requesting loan docs for Cobo NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

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

    // Sign: Single Borrower Sun Run
    test.each(loanSingleBorrSunRun)(
      'Sign loan docs for Single Borrower SunRun',
      async borrower => {
        console.log(`Signing loan docs for ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );

    // Sign: Single Borrower Non Sun Run
    test.each(loanSingleBorrNonSunRun)(
      'Sign loan docs for Single Borrower NonSunRun',
      async borrower => {
        console.log(`Signing loan docs for NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);
        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );

    // Sign: Coborrower Primary Sun Run
    test.each(loanCoBorrSunRun)(
      'Sign loan docs for Primary SunRun',
      async borrower => {
        console.log(`Signing loan docs for Primary SunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );

    // Sign: Coborrower Secondary Sun Run
    test.each(loanCoBorrSunRun)(
      'Sign loan docs for Secondary SunRun',
      async borrower => {
        console.log(`Signing loan docs for Secondary SunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const coboDocuSignLink = await coboEmail.getDocuSignLink(coboInbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(coboDocuSignLink);
      },
      300000
    );

    // Sign: Coborrower Primary Non Sun Run
    test.each(loanCoBorrNonSunRun)(
      'Sign loan docs for Primary NonSunRun',
      async borrower => {
        console.log(`Signing loan docs for Primary NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);
        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );

    // Sign: Coborrower Secondary Non Sun Run
    test.each(loanCoBorrNonSunRun)(
      'Sign loan docs for Secondary NonSunRun',
      async borrower => {
        console.log(`Signing loan docs for Secondary NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

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
