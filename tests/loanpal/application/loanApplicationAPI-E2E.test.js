import BaseTest from '../../../src/base/baseTest';
import LoanAPI from '../../../src/apis/loanAPI';
import LoanData from '../../../src/utilities/loanData';
import ElasticClient from '../../../src/utilities/elasticClient';
import UWLoginPage from '../../../src/pages/uwPortal/uwLogin/uwLoginPage';
import UWLoanDetailsPage from '../../../src/pages/uwPortal/uwLoanDetails/uwLoanDetailsPage';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';
import PPLoanDetailsPage from '../../../src/pages/partnerPortal/ppLoanDetails/ppLoanDetailsPage';

import sbFile from '../../../data/loanpal/application/sb-approved-deferred-stip-data_API.csv';
import cbFile from '../../../data/loanpal/application/cb-approved-deferred-stip-data_API.csv';
import IP432File from '../../../data/loanpal/application/approved-deferred-stip-data_IP-432.csv';
import IP427File from '../../../data/loanpal/application/approved-deferred-stip-data_IP-427.csv';
import IP442File from '../../../data/loanpal/application/approved-deferred-stip-data_IP-442.csv';
import IP431File from '../../../data/loanpal/application/approved-deferred-stip-data_IP-431.csv';

const single = IP431File.filter(item => item.type === 'Single');
const primary = IP431File.filter(item => item.type === 'Primary');
const secondary = IP431File.filter(item => item.type === 'Secondary');
const combined = IP431File.filter(item => item.type === 'Combined');

const singleTemplate = require('../../../data/loanDocs/newLoanTemplatesJSON/singleBorrowerLoanTemplate.json');
const combinedTemplate = require('../../../data/loanDocs/newLoanTemplatesJSON/coBorrowerLoanTemplate.json');

const { getRandomNum, csv, fs } = require('../../../src/utilities/imports');

jest.setTimeout(60000 * 5);

describe('LP Application API', () => {
  let baseTest;
  const responses = [];
  let streetNum = 1000;
  beforeAll(async () => {
    // Get an active loans for the applicant
    console.log('CHECKING ACTIVE LOANS');
    const esClient = new ElasticClient();
    const activePrimaryLoans = await esClient.getActiveLoans('666072358');
    console.log(activePrimaryLoans, 'activePrimaryLoans');
    const activeSecondaryLoans = await esClient.getActiveLoans('666320691');
    console.log(activeSecondaryLoans, 'activeSecondaryLoans');
    const activeLoans = [...activePrimaryLoans, ...activeSecondaryLoans];
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
  });
  afterAll(() => {
    if (responses.length) {
      csv.writeToPath('./reponses.csv', responses);
      const loans = responses.map(res => {
        const response = JSON.parse(res);
        return JSON.stringify(response.loanId);
      });
      fs.writeFileSync('./createdLoans.json', `[${loans}]`);
    }
  });

  describe.only.each(primary)('E2E Deferred Stips', record => {
    beforeEach(() => {
      baseTest = new BaseTest('chrome');
    });

    afterEach(async () => {
      if (baseTest) await baseTest.close();
    });
    test.each(['english', 'spanish'])(`Validate %s ${record.type} borrower ${record.stips}`, async language => {
      streetNum++;
      const template = record.type === 'Single' ? singleTemplate : combinedTemplate;
      // Assemble loan object
      if (!record.mock) delete template.overrideResponse;
      template.overrideResponse.Bucket = `${process.env.STAGE}-core.loanpal.com`;
      template.overrideResponse.Key = record.mock;
      template.clientId = record.partner;
      template.applicant.firstName = record.firstName;
      template.applicant.lastName = record.lastName;
      template.applicant.address.street = `${streetNum} primarylp ave.`;
      if (record.type !== 'Single') {
        template.coApplicants[0].firstName = record.coFirstName;
        template.coApplicants[0].address.street = `${streetNum} secondarylp Blvd.`;
      }
      template.applicant.email = record.email;
      template.applicant.dob = record.dateOfBirth;
      template.applicant.ssn = record.ssn;
      template.applicant.spokenLanguage = language;
      template.salesRep.email = record.srEmail;
      const response = await new LoanAPI(template).getBody();
      responses.push([JSON.stringify(response, null, 2)]);
      // Assert response
      expect(response).toEqual(expect.objectContaining({ loanId: expect.stringMatching(/\d{2}-\d{2}-\d{6}/g), type: record.type, status: 'Approved' }));
      const { loanId } = response;
      console.log('ASSERT LOAN STIPS', loanId);
      const stips = record.stips.split(',').map(item => item.trim());
      const newLoan = new LoanData(loanId);
      console.log('Waiting for loan to update...');
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
      const newLoanData = await newLoan.getSrcLoan();
      const hasStips = record.hasDeferredStips === 'TRUE' ? true : record.hasDeferredStips === 'FALSE' ? false : undefined;
      expect(newLoanData.loanStatus.hasDeferredStips).toBe(hasStips);
      const expected = { loanId, stips: newLoanData.creditDecision.stipulations };
      const actual = { loanId, stips };
      expect(expected).toEqual(actual);

      // UW validation
      console.log('NAVIGATE TO UNDERWRITER');
      const uwLogin = new UWLoginPage(baseTest.webDriver);
      await uwLogin.completelogin();
      const uwLoanDetails = new UWLoanDetailsPage(baseTest.webDriver, loanId);
      await uwLoanDetails.openURL();
      // Assert Loan Status
      const loanStatus = await uwLoanDetails.validateLoanStatus(record.status);
      expect(loanStatus).toBeTruthy();
      // Assert Approve Loan Button status
      const appoveLoanBtn = await uwLoanDetails.validateApproveLoanButton(record.approvedButton);
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
      const ppLoanDetails = new PPLoanDetailsPage(baseTest.webDriver, loanId);
      await ppLoanDetails.goToPage();
      const appStatus = await ppLoanDetails.validateAppStatus(record.status);
      expect(appStatus).toBeTruthy();
      const timelineApproval = await ppLoanDetails.validateTimelineApproval(record.status);
      expect(timelineApproval).toBeTruthy();
    });
  });
});
