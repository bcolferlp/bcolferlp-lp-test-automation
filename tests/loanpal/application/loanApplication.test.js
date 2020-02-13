/* eslint-disable jest/valid-describe */
import BaseTest from '../../../src/base/baseTest';
import CSVParser from '../../../src/utilities/parseCSV';
import LPAppPage from '../../../src/pages/loanpal/application/lpAppPage';

jest.setTimeout(60000 * 5);
const { path } = require('../../../src/utilities/imports');

const testFile = path.join(__dirname, '../../../data/loanpal/application/approved-deferred-stip-data.csv');
const csv = new CSVParser(testFile);
describe('Underwriter Portal Login', () => {
  let baseTest;
  let lpApp;
  let data;

  beforeAll(async () => {
    data = await csv.parseFile();
    baseTest = new BaseTest('chrome');
    lpApp = new LPAppPage(baseTest.webDriver);
  });

  //   beforeEach(async () => {});

  //   afterEach(async () => {
  //     if (baseTest) await baseTest.close();
  //   });

  //   afterAll(async () => {
  //     if (baseTest) await baseTest.quit();
  //   });

  test('Apply for a loan through the loanpal UI', async () => {
    for (const record of data) {
      console.log(record, 'record');

      await lpApp.goToPage(record.url);
      await lpApp.fillOutForm(record);
      await lpApp.reviewInfo();
      await lpApp.apply();
    }
  });
});
