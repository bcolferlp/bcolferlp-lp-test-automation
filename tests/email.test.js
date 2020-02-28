/* eslint-disable guard-for-in */
import h2t from 'html-to-text';

import LoanEmailPage from '../src/pages/loanEmailPage';

require('dotenv').config();

const emailRegex = require('../src/utilities/emailRegex');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };

const testHtml = require('../data/email/html');

jest.setTimeout(60000);
describe('Email', () => {
  let email;
  let inbox;
  beforeAll(async () => {
    console.log('SIGNING IN...');
    email = new LoanEmailPage(emailConfig);
    console.log('GETTING INBOX...');
    inbox = await email.mailConnect('UNSEEN', 'Testing');
    // console.log(inbox, 'inbox');
  });
  describe('Email text validation', () => {
    test.skip('testHtml', () => {
      const message = h2t.fromString(testHtml);
      console.log(message, 'message');
    });
    // // DocuSign email
    test('validate docusign email text', async () => {
      const docuSignEmail = await email.getSplitEmail(inbox, 'docusign');
      expect(docuSignEmail).toBeTruthy();
      for (const i in docuSignEmail) {
        expect(docuSignEmail[i]).toMatch(emailRegex.docuSignEmail[i]);
      }
    });

    // Solar Financing Decision email
    test('validate Solar Financing Decision email text', async () => {
      console.log('VALIDATING SOLAR FINANCING DECISION EMAIL TEXT...');
      const solarFinancingDecision = await email.getEmail(inbox, 'solarFinancingDecision');
      // console.log(solarFinancingDecision);
      expect(solarFinancingDecision).toBeTruthy();
      for (const expression of emailRegex.solarFinancingDecision) {
        expect(solarFinancingDecision).toMatch(expression);
      }
    });

    // Application Submitted Notification email
    test('validate Application Submitted notification email text', async () => {
      const applicationSubmittedNotification = await email.getSplitEmail(inbox, 'applicationSubmittedNotification');
      expect(applicationSubmittedNotification).toBeTruthy();
      for (const i in applicationSubmittedNotification) {
        expect(applicationSubmittedNotification[i]).toMatch(emailRegex.applicationSubmittedNotification[i]);
      }
    });

    // Approval Notification email
    test('validate Approval notification email text', async () => {
      const approvalNotification = await email.getSplitEmail(inbox, 'approvalNotification');
      expect(approvalNotification).toBeTruthy();
      for (const i in approvalNotification) {
        expect(approvalNotification[i]).toMatch(emailRegex.approvalNotification[i]);
      }
    });

    // Docs Sent Notification email
    test('validate Docs Sent notification email text', async () => {
      const docsSentNotification = await email.getSplitEmail(inbox, 'docsSentNotification');
      expect(docsSentNotification).toBeTruthy();
      for (const i in docsSentNotification) {
        expect(docsSentNotification[i]).toMatch(emailRegex.docsSentNotification[i]);
      }
    });

    // DocsSigned Notification email
    test('validate DocsSigned Notification email text', async () => {
      const docsSignedNotification = await email.getSplitEmail(inbox, 'docsSignedNotification');
      expect(docsSignedNotification).toBeTruthy();
      for (const i in docsSignedNotification) {
        expect(docsSignedNotification[i]).toMatch(emailRegex.docsSignedNotification[i]);
      }
    });

    // Completed DocuSign email
    test('validate Completed Docs email text', async () => {
      const completedDocuSign = await email.getSplitEmail(inbox, 'completedDocuSign');
      expect(completedDocuSign).toBeTruthy();
      for (const i in completedDocuSign) {
        expect(completedDocuSign[i]).toMatch(emailRegex.completedDocuSign[i]);
      }
    });

    // Docs Completed Notication email
    test('validate Docs Completed Notification email text', async () => {
      const docsCompletedNotifcation = await email.getSplitEmail(inbox, 'docsCompletedNotifcation');
      expect(docsCompletedNotifcation).toBeTruthy();
      for (const i in docsCompletedNotifcation) {
        expect(docsCompletedNotifcation[i]).toMatch(emailRegex.docsCompletedNotifcation[i]);
      }
    });

    // NTP Complteted Notification email
    test('validate NTP Completed Notifcation email text', async () => {
      const ntpCompleteNotification = await email.getSplitEmail(inbox, 'ntpCompleteNotification');
      expect(ntpCompleteNotification).toBeTruthy();
      for (const i in ntpCompleteNotification) {
        expect(ntpCompleteNotification[i]).toMatch(emailRegex.ntpCompleteNotification[i]);
      }
    });
  });

  describe.only('IP-431', () => {
    // Solar Financing Decision email
    test('validate Solar Financing Decision email text', async () => {
      console.log('VALIDATING SOLAR FINANCING DECISION EMAIL TEXT...');
      const solarFinancingDecision = await email.getEmail(inbox, 'solarFinancingDecision');
      // const htmlText = h2t.fromString(testHtml);
      // console.log(htmlText);
      const solarFinancingDecision1 = JSON.stringify(solarFinancingDecision).replace(/\\n/g, ' ');
      // console.log(solarFinancingDecision);
      // const newText = solarFinancingDecision.replace(/\\n/g, '');
      // console.log(newText);
      // expect(solarFinancingDecision).toBeTruthy();
      for (const expression of emailRegex.solarFinancingDecision) {
        expect(solarFinancingDecision1).toMatch(expression);
      }

      // for (const expression of emailRegex.nextSteps) {
      //   expect(solarFinancingDecision).toMatch(expression);
      // }
    });
  });
});
