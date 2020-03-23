import LoanEmailPage from '../src/pages/loanEmailPage';

require('dotenv').config();

const emailConfig = { user: process.env.emailUser, password: process.env.TESTPASS };
const coboConfig = { user: process.env.coboUser, password: process.env.TESTPASS };

describe('Delete Email', () => {
  test('Deleting inbox for Single Borrower', async () => {
    console.log('Delete inbox for Single Borrower');
    const email = new LoanEmailPage(emailConfig);
    await email.deleteMail();
  }, 300000);
  test('Delete inbox for CoBorrower', async () => {
    console.log('Deleting inbox for CoBorrower');
    const coboEmail = new LoanEmailPage(coboConfig);
    await coboEmail.deleteMail();
  }, 300000);
});
