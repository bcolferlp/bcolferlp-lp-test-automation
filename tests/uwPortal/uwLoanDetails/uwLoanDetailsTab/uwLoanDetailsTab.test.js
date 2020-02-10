import BaseTest from '../../../../src/base/baseTest';
import UWLoginPage from '../../../../src/pages/uwPortal/uwLogin/uwLoginPage';
import UWLoanDetailsTabPage from '../../../../src/pages/uwPortal/uwLoanDetails/uwLoanDetailsTab/uwLoanDetailsTabPage';

jest.setTimeout(60000 * 5);
describe('Loan Details Tab', () => {
  let baseTest;
  let uwLoginPage;
  let uwLoanDetailsTab;
  const loanId = '20-14-001111';
  beforeAll(async () => {
    baseTest = new BaseTest('chrome');
    uwLoginPage = new UWLoginPage(baseTest.webDriver);
    uwLoanDetailsTab = new UWLoanDetailsTabPage(baseTest.webDriver, loanId);
    await uwLoginPage.completelogin();
  });

  afterEach(async () => {
    if (baseTest) await baseTest.close();
  });

  afterAll(async () => {
    if (baseTest) await baseTest.quit();
  });

  test('104812: Loan Details values should be correct', async () => {
    await uwLoanDetailsTab.openURL();
    await uwLoanDetailsTab.clickEditIcon();
    const isModalDisplayed = await uwLoanDetailsTab.displayModal();
    expect(isModalDisplayed).toBeTruthy();

    const comparedValues = await uwLoanDetailsTab.verifyApplicantData();
    for (const values of comparedValues) {
      expect(values.v1).toEqual(values.v2);
    }
  });
});
