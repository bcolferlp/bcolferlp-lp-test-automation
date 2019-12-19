/* eslint-disable guard-for-in */
import LoanEmailPage from '../src/pages/loanEmailPage';

require('dotenv').config();

const emailRegex = require('../src/utilities/emailRegex');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };

describe('Email', () => {
  describe('Email text validation', () => {
    let email;
    let inbox;
    beforeAll(async () => {
      email = new LoanEmailPage(emailConfig);
      inbox = await email.getInbox();
    });
    // DocuSign email
    test('validate docusign email text', async () => {
      const docuSignEmail = await email.getSplitEmail(inbox, 'docusign');
      expect(docuSignEmail).toBeTruthy();
      for (const i in docuSignEmail) {
        expect(docuSignEmail[i]).toMatch(emailRegex.docuSignEmail[i]);
      }
    }, 30000);

    // Solar Financing Decision email
    test('validate Solar Financing Decision email text', async () => {
      const solarFinancingDecision = await email.getSplitEmail(inbox, 'solarFinancingDecision');
      expect(solarFinancingDecision).toBeTruthy();
      for (const i in solarFinancingDecision) {
        expect(solarFinancingDecision[i]).toMatch(emailRegex.solarFinancingDecision[i]);
      }
    }, 30000);

    // Application Submitted Notification email
    test('validate Application Submitted notification email text', async () => {
      const applicationSubmittedNotification = await email.getSplitEmail(inbox, 'applicationSubmittedNotification');
      expect(applicationSubmittedNotification).toBeTruthy();
      for (const i in applicationSubmittedNotification) {
        expect(applicationSubmittedNotification[i]).toMatch(emailRegex.applicationSubmittedNotification[i]);
      }
    }, 30000);

    // Approval Notification email
    test('validate Approval notification email text', async () => {
      const approvalNotification = await email.getSplitEmail(inbox, 'approvalNotification');
      expect(approvalNotification).toBeTruthy();
      for (const i in approvalNotification) {
        expect(approvalNotification[i]).toMatch(emailRegex.approvalNotification[i]);
      }
    }, 30000);

    // Docs Sent Notification email
    test('validate Docs Sent notification email text', async () => {
      const docsSentNotification = await email.getSplitEmail(inbox, 'docsSentNotification');
      expect(docsSentNotification).toBeTruthy();
      for (const i in docsSentNotification) {
        expect(docsSentNotification[i]).toMatch(emailRegex.docsSentNotification[i]);
      }
    }, 30000);

    // DocsSigned Notification email
    test('validate DocsSigned Notification email text', async () => {
      const docsSignedNotification = await email.getSplitEmail(inbox, 'docsSignedNotification');
      expect(docsSignedNotification).toBeTruthy();
      for (const i in docsSignedNotification) {
        expect(docsSignedNotification[i]).toMatch(emailRegex.docsSignedNotification[i]);
      }
    }, 30000);

    // Completed DocuSign email
    test('validate Completed Docs email text', async () => {
      const completedDocuSign = await email.getSplitEmail(inbox, 'completedDocuSign');
      expect(completedDocuSign).toBeTruthy();
      for (const i in completedDocuSign) {
        expect(completedDocuSign[i]).toMatch(emailRegex.completedDocuSign[i]);
      }
    }, 30000);

    // Docs Completed Notication email
    test('validate Docs Completed Notification email text', async () => {
      const docsCompletedNotifcation = await email.getSplitEmail(inbox, 'docsCompletedNotifcation');
      expect(docsCompletedNotifcation).toBeTruthy();
      for (const i in docsCompletedNotifcation) {
        expect(docsCompletedNotifcation[i]).toMatch(emailRegex.docsCompletedNotifcation[i]);
      }
    }, 30000);

    // NTP Complteted Notification email
    test('validate NTP Completed Notifcation email text', async () => {
      const ntpCompleteNotification = await email.getSplitEmail(inbox, 'ntpCompleteNotification');
      expect(ntpCompleteNotification).toBeTruthy();
      for (const i in ntpCompleteNotification) {
        expect(ntpCompleteNotification[i]).toMatch(emailRegex.ntpCompleteNotification[i]);
      }
    }, 30000);
  });
});
