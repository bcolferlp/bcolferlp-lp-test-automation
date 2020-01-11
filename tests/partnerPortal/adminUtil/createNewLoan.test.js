/* eslint-disable global-require */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import ADMINLoginPage from '../../../src/pages/partnerPortal/adminUtil/adminUtilPage';

each(['chrome']).describe('Admin Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('Positive login test', async done => {
    const adminLoginPage = await new ADMINLoginPage(baseTest.webDriver);
    await adminLoginPage.fullScreen();
    await adminLoginPage.open();
    await adminLoginPage.sleep(3000);
    await adminLoginPage.enterEmail();
    await adminLoginPage.enterPassword();
    await adminLoginPage.loginClick();
    await adminLoginPage.sleep(5000);
    await adminLoginPage.createNewLoan();
    // logout
    // await ppLoginPage.logOut();
    // make sure the button exists
    // const logoutConfirmation = await ppLoginPage.validateLogout();
    // expect(logoutConfirmation).toBeTruthy();
    await adminLoginPage.sleep(2000);
    done();
  }, 3000000);
});