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
    await ppLoginPage.fullScreen();
    await ppLoginPage.open();
    await ppLoginPage.enterEmail();
    await ppLoginPage.enterPassword();
    await ppLoginPage.loginClick();
    await ppLoginPage.sleep(2000);
    // logout
    await ppLoginPage.logOut();
    // make sure the button exists
    const logoutConfirmation = await ppLoginPage.validateLogout();
    expect(logoutConfirmation).toBeTruthy();
    await ppLoginPage.sleep(2000);
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
