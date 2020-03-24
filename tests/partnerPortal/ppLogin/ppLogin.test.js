/* eslint-disable jest/no-focused-tests */
/* eslint-disable global-require */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';

each(['chrome']).describe('PP Login Test', browser => {
  let baseTest;

  beforeEach(() => {
    baseTest = new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('Positive login test', async done => {
    const ppLoginPage = await new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.completeLogin();
    await ppLoginPage.validateLogin();
    await ppLoginPage.logOut();
    await ppLoginPage.validateLogout();
    done();
  }, 30000);

  each(require('../../../data/partnerPortal/ppLogin/ppLogin.js')).test(
    'Negative login test',
    async ({ username, password, errorMessage }, done) => {
      const ppLoginPage = await new PPLoginPage(baseTest.webDriver);
      await ppLoginPage.open();
      await ppLoginPage.enterEmail(username);
      await ppLoginPage.enterPassword(password);
      await ppLoginPage.loginClick();
      await baseTest.webDriver.sleep(2000);
      const errorElem = await ppLoginPage.getErrorElement();
      const errorText = await errorElem.getAttribute('textContent');
      expect(errorText).toBe(errorMessage);
      done();
    },
    30000
  );
});
