import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';
import IPProfilePage from '../../../src/pages/investorPortal/ipProfile/ipProfilePage';
import ReportsPage from '../../../src/pages/investorPortal/ipReports/ipReportsPage';

const profileData = require('../../../data/investorPortal/ipProfile/ipProfileData');

jest.setTimeout(60000 * 30);
describe('ipReports', () => {
  let baseTest;
  beforeEach(async () => {
    baseTest = await new BaseTest('chrome');
  });

  afterEach(async () => {
    await baseTest.close();
  });
  test.each(profileData)('90355: Pre Pay Graph', async data => {
    // Login
    const ipLoginPage = new IPLoginPage(baseTest.webDriver);
    await ipLoginPage.completelogin();
    // Profile
    const ipProfilePage = new IPProfilePage(baseTest.webDriver);
    await ipProfilePage.changeClient(data);
    // re-login
    await ipLoginPage.completelogin();
    // Reports
    const reportsPage = new ReportsPage(baseTest.webDriver);
    await reportsPage.goToPrePayPage();
    const providers = await reportsPage.gatherProviders();
    expect(providers.length).toBeGreaterThan(0);
    console.log(`${providers.length} Gathered`);
    const results = await reportsPage.verifyGraph(providers);
    expect(results.length).toBeGreaterThan(0);
    expect(results).not.toContainEqual(
      expect.objectContaining({
        name: expect.any(String),
        graphValue: expect.any(String),
        tableValue: expect.any(String),
        result: false
      })
    );
  });
});
