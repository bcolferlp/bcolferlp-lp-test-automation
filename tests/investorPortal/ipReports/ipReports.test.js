import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';
import IPProfilePage from '../../../src/pages/investorPortal/ipProfile/ipProfilePage';
import ReportsPage from '../../../src/pages/investorPortal/ipReports/ipReportsPage';

jest.setTimeout(60000 * 30);
describe('ipReports', () => {
  let baseTest;
  beforeEach(async () => {
    baseTest = await new BaseTest('chrome');
  });

  afterEach(async () => {
    await baseTest.close();
  });
  test('Pre Pay Graph', async () => {
    // Login
    const ipLoginPage = new IPLoginPage(baseTest.webDriver);
    await ipLoginPage.completelogin();
    // Reports
    const reportsPage = new ReportsPage(baseTest.webDriver);
    await reportsPage.goToPrePayPage();
    const providers = await reportsPage.gatherProviders();
    const results = await reportsPage.verifyGraph(providers);
    console.log(results);
  });
});
