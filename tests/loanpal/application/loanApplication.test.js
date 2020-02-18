/* eslint-disable no-param-reassign */
/* eslint-disable jest/valid-describe */
import BaseTest from '../../../src/base/baseTest';
import LPAppPage from '../../../src/pages/loanpal/application/lpAppPage';
import ClientData from '../../../src/utilities/clientData';
import file from '../../../data/loanpal/application/approved-deferred-stip-data.csv';

jest.setTimeout(60000 * 5);

describe('Underwriter Portal Login', () => {
  let baseTest;
  let lpApp;

  beforeAll(async () => {
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

  test.each(file)('Apply for a loan through the loanpal UI', async record => {
    const clientData = new ClientData(record.partner);
    const [clientConfig] = await clientData.getClientConfig();
    const { loanOptionsMap } = clientConfig;
    record = { ...record, loanOptionsMap };
    console.log(record, 'clientConfig');
    await lpApp.goToPage(record.url);
    await lpApp.fillOutForm(record);
    await lpApp.reviewInfo();
    await lpApp.apply();
    const loanID = await lpApp.getLoanID();
    expect(loanID).toEqual(expect.stringMatching(/\d{2}-\d{2}-\d{6}/g));
  });
});
