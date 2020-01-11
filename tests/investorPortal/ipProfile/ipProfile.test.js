import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';
import IPProfilePage from '../../../src/pages/investorPortal/ipProfile/ipProfilePage';

const profileData = require('../../../data/investorPortal/ipProfile/ipProfileData');

each(['chrome']).describe('Profile Settings', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  each(profileData).test(
    'Change a client id',
    async ({ clientId, clientVerify }, done) => {
      const ipLoginPage = new IPLoginPage(baseTest.webDriver);
      await ipLoginPage.completelogin();
      const ipProfilePage = new IPProfilePage(baseTest.webDriver);
      await ipProfilePage.goToProfilePage();
      const { cwText, ccText, change } = await ipProfilePage.selectClient(clientId, clientVerify);

      expect(cwText).toEqual(ccText);

      await ipProfilePage.clickSaveChanges(change);
      await ipProfilePage.verifyLogout();
      // re-login
      await ipLoginPage.completelogin();
      const currentClient = await ipProfilePage.verifyClient();
      expect(currentClient).toEqual(clientVerify);

      done();
    },
    300000
  );
});
