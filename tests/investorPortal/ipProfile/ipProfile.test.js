import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';
import IPProfilePage from '../../../src/pages/investorPortal/ipProfile/ipProfilePage';

require('dotenv').config();
const profileData = require('../../../data/investorPortal/ipProfile/ipProfileData');

jest.setTimeout(60000 * 5);

describe.each(['chrome'])('Profile Settings', browser => {
  let baseTest;
  let ipLoginPage;
  let ipProfilePage;
  beforeEach(async () => {
    baseTest = new BaseTest(browser);
    ipLoginPage = new IPLoginPage(baseTest.webDriver);
    ipProfilePage = new IPProfilePage(baseTest.webDriver);
  });

  afterEach(async () => {
    await baseTest.close();
    await baseTest.quit();
  });

  test('96686: Profile Defaults', async () => {
    console.log('96686: Profile Defaults');
    // Login
    await ipLoginPage.completelogin();
    await ipProfilePage.goToProfilePage();
    // Verify Username
    const userNameText = await ipProfilePage.verifyUserName();
    expect(userNameText).toBe(process.env.TESTEMAIL);
  });

  test.skip.each(profileData)('96689: Client ID - Admin user', async ({ clientId, clientVerify }) => {
    console.log('96689: Client ID - Admin user', clientId);
    // Login
    await ipLoginPage.completelogin();
    await ipProfilePage.goToProfilePage();
    // Select a different Client ID
    const { cwText, ccText, change } = await ipProfilePage.selectClient(clientId, clientVerify);
    expect(cwText).toEqual(ccText);
    await ipProfilePage.clickSaveChanges(change);
    await ipProfilePage.verifyLogout();
    // re-login
    await ipLoginPage.completelogin();
    const currentClient = await ipProfilePage.verifyClient();
    expect(currentClient).toEqual(clientVerify);
  });

  test('96690: Client ID - Standard user', async () => {
    console.log('96690: Client ID - Standard user');
    const standardLogin = { username: process.env.standardUser, password: process.env.standardPass };
    // Login
    await ipLoginPage.standardLogin(standardLogin);
    await ipProfilePage.goToProfilePage();
    // Validate standard user restrictions
    const clientSelect = await ipProfilePage.standardUserClient();
    expect(clientSelect.length).toBe(0);
  });

  test('96687: Edit user personal data', async () => {
    console.log('96687: Edit user personal data');
    const data = { firstName: 'Test', lastName: 'Manager', fullName: 'Test Manager Jr.', phone: '+19165551234' };
    // Login
    await ipLoginPage.completelogin();
    await ipProfilePage.goToProfilePage();
    // Enter data
    const message = await ipProfilePage.enterPersonalData(data);
    expect(message).toBe('Settings Saved!');
    // Log out
    await ipLoginPage.logout();
    // Re-login
    await ipLoginPage.completelogin();
    await ipProfilePage.goToProfilePage();
    await ipProfilePage.validatePersonalData(data);
  });
});
