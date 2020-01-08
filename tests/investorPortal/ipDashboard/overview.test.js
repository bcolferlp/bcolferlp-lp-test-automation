import BaseTest from '../../../src/base/baseTest';
import IPLoginPage from '../../../src/pages/investorPortal/ipLogin/ipLoginPage';
import IPProfilePage from '../../../src/pages/investorPortal/ipProfile/ipProfilePage';
import OverviewPage from '../../../src/pages/investorPortal/ipDashboard/ipOverviewPage';

const profileData = require('../../../data/investorPortal/ipProfile/ipProfileData');

jest.setTimeout(60000 * 30);
describe('overview', () => {
  let baseTest;
  beforeEach(async () => {
    baseTest = await new BaseTest('chrome');
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test.each(profileData)('89796: the overview values should be accurate', async (data, done) => {
    // Login
    const ipLoginPage = new IPLoginPage(baseTest.webDriver);
    await ipLoginPage.completelogin();
    // Profile
    const ipProfilePage = new IPProfilePage(baseTest.webDriver);
    await ipProfilePage.changeClient(data);
    // re-login
    await ipLoginPage.completelogin();
    // Overview
    const overviewPage = new OverviewPage(baseTest.webDriver);
    const trancheRows = await overviewPage.getTrancheRows();
    expect(trancheRows).toBeTruthy();
    const overviewCards = await overviewPage.getOverview();
    expect(overviewCards).toBeTruthy();
    const overviewResults = await overviewPage.verifyOverview(trancheRows, overviewCards, data.clientId);
    expect(overviewResults.convertedElemNums[0]).toEqual(overviewResults.portfolioTotal);
    expect(overviewResults.convertedElemNums[1]).toEqual(overviewResults.totalLoan);
    expect(overviewResults.convertedElemNums[2]).toEqual(overviewResults.avgLoanAmt);
    expect(overviewResults.convertedElemNums[3]).toEqual(overviewResults.avgFico);
    done();
  });
});
