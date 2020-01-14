/* eslint-disable jest/no-identical-title */
/* eslint-disable guard-for-in */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';
import PartnerManager from '../../../src/pages/partnerPortal/partnerManager/partnerManager';

require('dotenv').config();

jest.setTimeout(60000 * 5);
each(['chrome']).describe('PP Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('User Manager', async () => {
    console.log('Logging in as BlueRaven Partner - Partner-Manager & Inviting Partner Managers');
    const ppLoginPage = new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.fullScreen();
    await ppLoginPage.open();
    await ppLoginPage.enterEmail(process.env.ppBlueRaven);
    await ppLoginPage.enterPassword(process.env.ppBlueRavenPass);
    await ppLoginPage.loginClick();
    await ppLoginPage.sleep(2000);
    const partnerManager = new PartnerManager(baseTest.webDriver);
    await partnerManager.validateUserManager();
  });
});
