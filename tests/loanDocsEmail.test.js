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
const coboConfig = { user: process.env.coboUser, password: process.env.emailPass };

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
  describe('SunRun CoBorrower', () => {
    let email;
    let coboEmail;
    let inbox;
    let coboInbox;
    let baseTest;

    beforeEach(async () => {
      baseTest = await new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    test.each(loanCoBorrSunRun)(
      'Sign loan docs for Primary SunRun',
      async borrower => {
        email = new LoanEmailPage(emailConfig);
        inbox = await email.getInbox();
        console.log(`Signing loan docs for Primary SunRun ${borrower.loanId}, ${borrower.firstName}`);

        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );
    test.each(loanCoBorrSunRun)(
      'Sign loan docs for Secondary SunRun',
      async borrower => {
        coboEmail = new LoanEmailPage(coboConfig);
        coboInbox = await coboEmail.getInbox();
        console.log(`Signing loan docs for Secondary SunRun ${borrower.loanId}, ${borrower.firstName}`);

        // Return link from headless email message
        const coboDocuSignLink = await coboEmail.getDocuSignLink(coboInbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(coboDocuSignLink);
      },
      300000
    );
  });
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
        console.log(`Requesting loan docs for NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

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
        console.log(`Signing loan docs for NonSunRun ${borrower.loanId}, ${borrower.firstName}`);
        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );
  });
  describe('NonSunRun CoBorrower', () => {
    let email;
    let coboEmail;
    let inbox;
    let coboInbox;
    let baseTest;

    beforeEach(async () => {
      baseTest = await new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    test.each(loanCoBorrNonSunRun)(
      'Request loan docs for Cobo NonSunRun',
      async borrower => {
        email = new LoanEmailPage(emailConfig);
        inbox = await email.getInbox();
        console.log(`Requesting loan docs for Cobo NonSunRun ${borrower.loanId}, ${borrower.firstName}, ${borrower.spokenLanguage}`);

        // Return link from headless email message
        const requestLoanDocsLink = await email.getLoanDocsLink(inbox, borrower);

        // Launch the Request Loan Docs page
        const requestLoanDocsPage = new RequestLoanDocsPage(baseTest.webDriver);
        await requestLoanDocsPage.requestDocuments(requestLoanDocsLink);
      },
      300000
    );
    test.each(loanCoBorrNonSunRun)(
      'Sign loan docs for Primary NonSunRun',
      async borrower => {
        console.log(`Signing loan docs for Primary NonSunRun ${borrower.loanId}, ${borrower.firstName}`);
        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, borrower);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );
    test.each(loanCoBorrNonSunRun)(
      'Sign loan docs for Secondary NonSunRun',
      async borrower => {
        coboEmail = new LoanEmailPage(coboConfig);
        coboInbox = await coboEmail.getInbox();
        console.log(`Signing loan docs for Secondary NonSunRun ${borrower.loanId}, ${borrower.firstName}`);

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
