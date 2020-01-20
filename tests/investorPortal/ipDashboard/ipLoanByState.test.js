import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';
import LoansbyStatePage from '../../../src/pages/investorPortal/ipDashboard/ipLoansByStatePage';

describe('Loans By States', () => {
  let baseTest;
  beforeEach(() => {
    baseTest = new BaseTest('chrome');
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('89797: State table matches the state map', async done => {
    const ipLoginPage = await new IPLoginPage(baseTest.webDriver);
    await ipLoginPage.fullScreen();
    await ipLoginPage.open();
    await ipLoginPage.enterEmail(process.env.ipEmail);
    await ipLoginPage.enterPassword(process.env.ipPass);
    await ipLoginPage.loginClick();

    const loansbyStatePage = await new LoansbyStatePage(baseTest.webDriver);
    const stateNames = await loansbyStatePage.getStateTable();
    const values = await loansbyStatePage.verifyStates(stateNames);

    values.forEach(item => {
      const { stateHeaderText, headerVerify } = item;
      expect(stateHeaderText).toEqual(headerVerify);
    });
    done();
  }, 120000);
});
