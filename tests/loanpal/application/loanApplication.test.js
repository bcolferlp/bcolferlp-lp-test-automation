/* eslint-disable no-param-reassign */
/* eslint-disable jest/valid-describe */
import BaseTest from '../../../src/base/baseTest';
import LPAppPage from '../../../src/pages/loanpal/application/lpAppPage';
import ClientData from '../../../src/utilities/clientData';
import LoanData from '../../../src/utilities/loanData';
import ElasticClient from '../../../src/utilities/elasticClient';
import UWLoginPage from '../../../src/pages/uwPortal/uwLogin/uwLoginPage';
import UWLoanDetailsPage from '../../../src/pages/uwPortal/uwLoanDetails/uwLoanDetailsPage';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';
import PPLoanDetailsPage from '../../../src/pages/partnerPortal/ppLoanDetails/ppLoanDetailsPage';
import file from '../../../data/loanpal/application/approved-deferred-stip-data.csv';

const { path, urls } = require('../../../src/utilities/imports');

jest.setTimeout(60000 * 5);

describe('LP Application', () => {
  let baseTest;
  let lpApp;
  beforeAll(() => {
    baseTest = new BaseTest('chrome');
    lpApp = new LPAppPage(baseTest.webDriver);
  });

  afterAll(async () => {
    if (baseTest) await baseTest.quit();
  });

  let loanID;
  let stips;
  test.each(file)(`112714 Apply for a loan through the loanpal UI, IP-426`, async record => {
    // Get an active loans for the applicant
    console.log('CHECKING ACTIVE LOANS');
    const esClient = new ElasticClient();
    const activeLoans = await esClient.getActiveLoans(record.ssn);
    console.log(activeLoans, 'activeLoans');
    if (process.env.STAGE === 'test' && activeLoans.length > 0) {
      // Change status to Canceled to avoid DupeKey
      for (const id of activeLoans) {
        const ld = new LoanData(id);
        const loan = await ld.getSrcLoan();
        loan.loanStatus.application = 'Canceled';
        await ld.putLoan(loan);
      }
    }
    console.log('CHECKING CLIENT CONFIG');
    // Get Config for provided client
    const clientData = new ClientData(record.partner);
    const [clientConfig] = await clientData.getClientConfig();
    const { loanOptionsMap } = clientConfig;
    record = { ...record, loanOptionsMap };
    // console.log(record, 'clientConfig');
    // Fill out application for provided client url
    console.log('FILL OUT APPLICATION');
    const url = path.join(urls.loanApp, record.url);
    await lpApp.goToPage(url);
    await lpApp.fillOutForm(record);
    await lpApp.reviewInfo();
    await lpApp.apply();
    // Assert LoanId is created
    loanID = await lpApp.getLoanID();
    expect(loanID).toEqual(expect.stringMatching(/\d{2}-\d{2}-\d{6}/g));
    // Assert that the provided stips match the database
    console.log('ASSERT LOAN STIPS');
    stips = record.stips.split(',').map(item => item.trim());
    const newLoan = new LoanData(loanID);
    const newLoanData = await newLoan.getSrcLoan();
    expect(newLoanData.loanStatus.hasDeferredStips).toBeTruthy();
    const expected = { loanId: loanID, stips: newLoanData.creditDecision.stipulations };
    const actual = { loanId: loanID, stips };
    expect(expected).toEqual(actual);

    // UW validation
    console.log('NAVIGATE TO UNDERWRITER');
    const uwLogin = new UWLoginPage(baseTest.webDriver);
    await uwLogin.completelogin();
    const uwLoanDetails = new UWLoanDetailsPage(baseTest.webDriver, loanID);
    await uwLoanDetails.openURL();
    // Assert Loan Status
    const loanStatus = await uwLoanDetails.validateLoanStatus(record.status);
    expect(loanStatus).toBeTruthy();
    // Assert Approve Loan Button status
    const appoveLoanBtn = await uwLoanDetails.validateApproveLoanButton('disabled');
    expect(appoveLoanBtn).toBeTruthy();
    // Assert all listed stips
    for (const stip of stips) {
      const stipElem = await uwLoanDetails.validateListedStips(stip);
      expect(stipElem).toBeTruthy();
    }

    // PP validation
    console.log('NAVIGATE TO PARTNER PORTAL');
    const ppLogin = new PPLoginPage(baseTest.webDriver);
    await ppLogin.completeLogin();
    const ppLoanDetails = new PPLoanDetailsPage(baseTest.webDriver, loanID);
    await ppLoanDetails.goToPage();
    const appStatus = await ppLoanDetails.validateAppStatus(record.status);
    expect(appStatus).toBeTruthy();
    const timelineApproval = await ppLoanDetails.validateTimelineApproval();
    expect(timelineApproval).toBeTruthy();
  });
});
