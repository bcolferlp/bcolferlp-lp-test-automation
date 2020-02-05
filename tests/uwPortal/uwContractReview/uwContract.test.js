import moment from 'moment';
import BaseTest from '../../../src/base/baseTest';
import UWLoginPage from '../../../src/pages/uwPortal/uwLogin/uwLoginPage';
import UWContractReviewPage from '../../../src/pages/uwPortal/uwContractReview/uwContractReviewPage';
import UWContractValidatePage from '../../../src/pages/uwPortal/uwContractReview/uwContractValidatePage';

require('dotenv').config();

jest.setTimeout(60000 * 5);
describe('Underwriter Contract Review', () => {
  let baseTest;
  let uwPage;
  let uwContractReview;
  const loanId = '20-09-001118';

  afterEach(async () => {
    if (baseTest) await baseTest.close();
  });

  afterAll(async () => {
    if (baseTest) await baseTest.quit();
  });

  test('97882: Complete a contract review', async () => {
    baseTest = new BaseTest('chrome');
    uwPage = new UWLoginPage(baseTest.webDriver);
    await uwPage.completelogin();
    uwContractReview = new UWContractReviewPage(baseTest.webDriver);
    await uwContractReview.loanContractReview(loanId);
    await uwContractReview.completeContractReview();
  });
  // LPL-1534
  test('104811: Matching tables from Dynamo to Aurora', async () => {
    const date = moment().format('YYYY-MM-DD');
    const uwContractValidate = new UWContractValidatePage(loanId);
    const [dynamoContract] = await uwContractValidate.verifyDynamo();
    expect(dynamoContract).toBeTruthy();
    const [auroraContract] = await uwContractValidate.verifyAurora();
    expect(auroraContract).toBeTruthy();
    const { dLoan, aLoan, dynamoDate, auroraDate } = uwContractValidate.verifyRecords(dynamoContract, auroraContract);
    console.log(`Compare Ids: ${dLoan}, ${aLoan}`);
    expect(dLoan).toEqual(loanId);
    expect(aLoan).toEqual(loanId);
    console.log('dynamoDate:', dynamoDate, 'auroraDate:', auroraDate);
    expect(`Dynamo date: ${dynamoDate.toISOString()}`).toEqual(expect.stringContaining(date));
    expect(`Aurora date: ${auroraDate.toISOString()}`).toEqual(expect.stringContaining(date));
  });
});
