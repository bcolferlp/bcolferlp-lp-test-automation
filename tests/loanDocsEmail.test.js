/* eslint-disable global-require */
/* eslint-disable guard-for-in */
import BaseTest from '../src/base/baseTest';
import LoanEmailPage from '../src/pages/loanEmailPage';
import RequestLoanDocsPage from '../src/pages/requestLoanDocsPage';
import DocuSignPage from '../src/pages/3rdParty/docuSign/docuSignPage';

// require('dotenv').config();

const { fs, path } = require('../src/utilities/imports');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };

describe('Loan Docs Email', () => {
  describe('me first', () => {
    test('make the json', () => {
      console.log('Making the json');
      const results = [{ loanId: '19-07-001021', fName: 'Stanley' }];
      fs.writeFileSync(path.join(__dirname, '../data/loanDocs/testData/test.json'), JSON.stringify(results));
    }, 30000);
  });
  describe('SunRun Single Borrower', () => {});
  describe('SunRun CoBorrower', () => {});
  describe('Non-SunRun Single Borrower', () => {
    let email;
    let inbox;
    let baseTest;
    const results = require('../data/loanDocs/testData/test.json');

    beforeAll(async () => {
      email = new LoanEmailPage(emailConfig);
      inbox = await email.getInbox();
      // console.log(inbox);
    });

    beforeEach(async () => {
      baseTest = await new BaseTest('chrome');
    });

    afterEach(async () => {
      await baseTest.close();
    });

    test.each(results)(
      'Request loan docs',
      async ({ loanId, fName }) => {
        // const fName = 'Stanley';
        // const loanId = '19-13-000991';

        // Return link from headless email message
        const requestLoanDocsLink = await email.getLoanDocsLink(inbox, loanId);

        // Launch the Request Loan Docs page
        const requestLoanDocsPage = new RequestLoanDocsPage(baseTest.webDriver);
        await requestLoanDocsPage.requestDocuments(requestLoanDocsLink);

        console.log('Waiting 10 seconds for email to generate');
        await requestLoanDocsPage.sleep(10000);

        // Grab the inbox again
        inbox = await email.getInbox();

        // Return link from headless email message
        const docuSignLink = await email.getDocuSignLink(inbox, fName);

        // Launch DocuSign Page
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        await docuSignPage.signLoanDocs(docuSignLink);
      },
      300000
    );
  });
  describe('Non-SunRun CoBorrower', () => {});
});
