import BaseTest from '../../../src/base/baseTest';
import UWLoginPage from '../../../src/pages/uwPortal/uwLogin/uwLoginPage';
import UWFundingPage from '../../../src/pages/uwPortal/uwFunding/uwFundingPage';
import { CSV_HEADERS } from '../../../data/uwPortal/uwFunding/fundingFileData';

const { validSolarLoanIds } = require('../../../data/uwPortal/uwFunding/loanIds');

jest.setTimeout(60000 * 5);
describe('Loan Funding', () => {
  let baseTest;
  let uwLoginPage;
  let uwFundingPage;
  beforeAll(async () => {
    baseTest = new BaseTest('chrome');
    uwLoginPage = new UWLoginPage(baseTest.webDriver);
    uwFundingPage = new UWFundingPage(baseTest.webDriver);
    await uwLoginPage.completelogin();
  });

  afterEach(async () => {
    if (baseTest) await baseTest.close();
  });

  afterAll(async () => {
    if (baseTest) await baseTest.quit();
  });

  test('104922: Verify the Goldman funding file generation', async () => {
    await uwFundingPage.getFundingPage();
    await uwFundingPage.makeLoansReady();
    await uwFundingPage.clickGoldmanPreGenButton();
    const { checkedLoanIds, uncheckedLoanIds } = await uwFundingPage.getLoanIds();
    await uwFundingPage.clickGoldmanGenButton();
    const csvFileKey = await uwFundingPage.verifyCsvGeneration();
    const csvFile = await uwFundingPage.downloadCsvFile(csvFileKey);
    const csvHeaders = await uwFundingPage.verifyCsvHeaders(csvFile);
    expect(csvHeaders).toEqual(expect.arrayContaining(CSV_HEADERS));
    const loanIds = await uwFundingPage.verifyCsvLoanIds(csvFile);
    loanIds.sort();
    checkedLoanIds.sort();
    expect(loanIds).toEqual(checkedLoanIds);

    const { gsFileLoanIdDataMap, testFileLoanIdDataMap } = await uwFundingPage.verifyCsvValues(csvFile);

    validSolarLoanIds.forEach(loanId => {
      if (uncheckedLoanIds.includes(loanId)) {
        return;
      }
      const gsFileData = gsFileLoanIdDataMap[loanId];
      const testFileData = testFileLoanIdDataMap[loanId];
      if (!gsFileData) {
        console.log(`Unable to find data for Loan ID: ${loanId} in Goldman Funding File`);
      }
      if (!testFileData) {
        console.log(`Unable to find data for Loan ID: ${loanId} in Test Data File`);
      }
      if (gsFileData && testFileData) {
        console.log(gsFileData, 'gsFileData**************************************');
        console.log(testFileData, 'testFileData**************************************');
        expect(gsFileData).toEqual(testFileData);
      }
    });
  });
});
