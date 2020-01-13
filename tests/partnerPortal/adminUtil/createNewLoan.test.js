/* eslint-disable global-require */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import ADMINLoginPage from '../../../src/pages/partnerPortal/adminUtil/adminUtilPage';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';

each(['chrome']).describe('Admin Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('Positive login test', async done => {
    const adminLoginPage = new ADMINLoginPage(baseTest.webDriver);
    await adminLoginPage.fullScreen();
    await adminLoginPage.open();
    await adminLoginPage.sleep(3000);
    await adminLoginPage.enterEmail();
    await adminLoginPage.enterPassword();
    await adminLoginPage.loginClick();
    await adminLoginPage.sleep(5000);
    await adminLoginPage.createNewLoan();
    await adminLoginPage.sleep(2000);
   
    const ppLoginPage = new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.completelogin();
    await adminLoginPage.validateThePPPage();
    done();
  }, 3000000);

  
});