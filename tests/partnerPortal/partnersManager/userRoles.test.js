/* eslint-disable jest/no-identical-title */
/* eslint-disable guard-for-in */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';
import UserPermission from '../../../src/pages/partnerPortal/userRoles/userRolesPage';

const userRolesData = require('../../../data/partnerPortal/userRoles/userRolesData.json');

require('dotenv').config();

jest.setTimeout(60000 * 5);
each(['chrome']).describe('PP Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  // HARM-166
  test.each(userRolesData)('90566: User Permission and Invite User Groups', async userroles => {
    console.log(`Logging in as BlueRaven with MANAGER permission & Inviting : ${userroles}`);
    const ppLoginPage = new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.completeLogin();
    const partnerManager = new UserPermission(baseTest.webDriver);
    await partnerManager.validateUserRoles(userroles);
  });
});
