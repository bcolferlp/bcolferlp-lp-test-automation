/* eslint-disable global-require */
import each from 'jest-each';
import BaseTest from '../../src/base/baseTest';
import ADMINLoginPage from '../../src/pages/adminUtil/adminUtilPage';
import PPLoginPage from '../../src/pages/partnerPortal/ppLogin/ppLoginPage';

const adminUtilData = require('../../data/adminUtil/adminUtilData.json');

jest.setTimeout(60000 * 5);

each(['chrome']).describe('Admin Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test.each(adminUtilData)('90484: create a loan', async loan => {
    const adminLoginPage = new ADMINLoginPage(baseTest.webDriver);
    await adminLoginPage.completeLogin();

    await adminLoginPage.createNewLoan(loan);
    await adminLoginPage.sleep(2000);

    const ppLoginPage = new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.completeLogin();
    const validatePPloginPage = await adminLoginPage.validateThePPPage();
    expect(validatePPloginPage).toBeTruthy();
  });
});
