import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';

const loginFile = require('../../../data/investorPortal/ipLogin/ipLogin.js');

each(['chrome']).describe('IP Login Test', browser => {
  let baseTest;

  beforeEach(() => {
    baseTest = new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test.skip('Positive login test', async done => {
    const ipLoginPage = await new IPLoginPage(baseTest.webDriver);
    await ipLoginPage.completelogin();
    const logoutBtn = await ipLoginPage.validateLogin();
    expect(logoutBtn).toBeTruthy();
    done();
  }, 30000);

  each(loginFile).test(
    'Negative login test',
    async ({ username, password, errorMessage }, done) => {
      const ipLoginPage = await new IPLoginPage(baseTest.webDriver);
      await ipLoginPage.open();
      await ipLoginPage.enterEmail(username);
      await ipLoginPage.enterPassword(password);
      await ipLoginPage.loginClick();
      await ipLoginPage.sleep(2000);
      const errorElem = await ipLoginPage.getErrorElement();
      const errorText = await errorElem.getAttribute('textContent');
      expect(errorText).toBe(errorMessage);
      done();
    },
    30000
  );
});
