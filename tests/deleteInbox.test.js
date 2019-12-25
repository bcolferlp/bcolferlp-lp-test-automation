import LoanEmailPage from '../src/pages/loanEmailPage';

require('dotenv').config();

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };
const coboConfig = { user: process.env.coboUser, password: process.env.emailPass };

describe.skip('Delete Email', () => {
  test('Delete inbox for Single Borrower', async () => {
    const email = new LoanEmailPage(emailConfig);
    await email.deleteMail();
  }, 300000);
  test('Delete inbox for CoBorrower', async () => {
    const coboEmail = new LoanEmailPage(coboConfig);
    await coboEmail.deleteMail();
  }, 300000);
});
