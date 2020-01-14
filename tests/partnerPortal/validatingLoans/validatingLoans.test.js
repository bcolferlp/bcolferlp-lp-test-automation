/* eslint-disable jest/no-focused-tests */
/* eslint-disable global-require */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';

each(['chrome']).describe('Validating Loans', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });
  test ('Login to Partner Portal', async done => {
    const ppLoginPage = await new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.completelogin();
    await ppLoginPage.validateThePPPage();
    await ppLoginPage.sleep(5000);
    done();
  }, 30000);
});
