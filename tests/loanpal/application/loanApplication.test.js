/* eslint-disable no-param-reassign */
/* eslint-disable jest/valid-describe */
import BaseTest from '../../../src/base/baseTest';
import LPAppPage from '../../../src/pages/loanpal/application/lpAppPage';
import ClientData from '../../../src/utilities/clientData';
import LoanData from '../../../src/utilities/loanData';
import ElasticClient from '../../../src/utilities/elasticClient';
import file from '../../../data/loanpal/application/approved-deferred-stip-data.csv';

const { path, urls } = require('../../../src/utilities/imports');

jest.setTimeout(60000 * 5);

describe('Underwriter Portal Login', () => {
  let baseTest;
  let lpApp;

  beforeAll(async () => {
    baseTest = new BaseTest('chrome');
    lpApp = new LPAppPage(baseTest.webDriver);
  });

  beforeEach(async () => {});

  //   afterEach(async () => {
  //     if (baseTest) await baseTest.close();
  //   });

  //   afterAll(async () => {
  //     if (baseTest) await baseTest.quit();
  //   });

  test.each(file)('Apply for a loan through the loanpal UI', async record => {
    if (record) {
      // Get an active loans for the applicant
      const esClient = new ElasticClient();
      const activeLoans = await esClient.getActiveLoans(record.ssn);
      console.log(activeLoans, 'activeLoans');
      if (process.env.STAGE === 'test' && activeLoans.length > 0) {
        // Change status to Canceled to avoid DupeKey
        for (const { id } of activeLoans) {
          const ld = new LoanData(id);
          const loan = await ld.getSrcLoan();
          loan.loanStatus.application = 'Canceled';
          await ld.putLoan(loan);
        }
      }
      // Get Config for provided client
      const clientData = new ClientData(record.partner);
      const [clientConfig] = await clientData.getClientConfig();
      const { loanOptionsMap } = clientConfig;
      record = { ...record, loanOptionsMap };
      // console.log(record, 'clientConfig');
      // Fill out application for provided client url
      const url = path.join(urls.loanApp, record.url);
      await lpApp.goToPage(url);
      await lpApp.fillOutForm(record);
      await lpApp.reviewInfo();
      await lpApp.apply();
      // Assert LoanId is created
      const loanID = await lpApp.getLoanID();
      expect(loanID).toEqual(expect.stringMatching(/\d{2}-\d{2}-\d{6}/g));
      // Assert that the provided stips match the database
      const newLoan = new LoanData(loanID);
      const newLoanData = await newLoan.getSrcLoan();
      const expected = { loanId: loanID, stips: newLoanData.creditDecision.stipulations };
      const actual = { loanId: loanID, stips: record.stips.split(',').map(item => item.trim()) };
      expect(expected).toEqual(actual);
    }
  });
});
