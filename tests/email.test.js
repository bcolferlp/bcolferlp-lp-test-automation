/* eslint-disable guard-for-in */
import LoanEmailPage from '../src/pages/loanEmailPage';

require('dotenv').config();

const emailRegex = require('../src/utilities/emailRegex');

describe('Email', () => {
  describe('Email text validation', () => {
    const emailConfig = 'rainloop';
    // Get message
    test.skip('get message text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const mail = await email.getEmail('completedDocuSign');
      console.log(mail);
    }, 30000);

    // DocuSign email
    test('validate docusign email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const docuSignEmail = await email.getEmail('docusign');
      expect(docuSignEmail).toBeTruthy();
      for (const i in docuSignEmail) {
        expect(docuSignEmail[i]).toMatch(emailRegex.docuSignEmail[i]);
      }
    }, 30000);

    // Solar Financing Decision email
    test('validate Solar Financing Decision email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const solarFinancingDecision = await email.getEmail('solarFinancingDecision');
      expect(solarFinancingDecision).toBeTruthy();
      for (const i in solarFinancingDecision) {
        expect(solarFinancingDecision[i]).toMatch(emailRegex.solarFinancingDecision[i]);
      }
    }, 30000);

    // Application Submitted Notification email
    test('validate Application Submitted notification email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const applicationSubmittedNotification = await email.getEmail('applicationSubmittedNotification');
      expect(applicationSubmittedNotification).toBeTruthy();
      for (const i in applicationSubmittedNotification) {
        expect(applicationSubmittedNotification[i]).toMatch(emailRegex.applicationSubmittedNotification[i]);
      }
    }, 30000);

    // Approval Notification email
    test('validate Approval notification email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const approvalNotification = await email.getEmail('approvalNotification');
      expect(approvalNotification).toBeTruthy();
      for (const i in approvalNotification) {
        expect(approvalNotification[i]).toMatch(emailRegex.approvalNotification[i]);
      }
    }, 30000);

    // Docs Sent Notification email
    test('validate Docs Sent notification email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const docsSentNotification = await email.getEmail('docsSentNotification');
      expect(docsSentNotification).toBeTruthy();
      for (const i in docsSentNotification) {
        expect(docsSentNotification[i]).toMatch(emailRegex.docsSentNotification[i]);
      }
    }, 30000);

    // Completed DocuSign email
    test('validate Completed Docs email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const completedDocuSign = await email.getEmail('completedDocuSign');
      expect(completedDocuSign).toBeTruthy();
      for (const i in completedDocuSign) {
        expect(completedDocuSign[i]).toMatch(emailRegex.completedDocuSign[i]);
      }
    }, 30000);

    // Docs Completed Notication email
    test('validate Docs Completed Notification email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const docsCompletedNotifcation = await email.getEmail('docsCompletedNotifcation');
      expect(docsCompletedNotifcation).toBeTruthy();
      for (const i in docsCompletedNotifcation) {
        expect(docsCompletedNotifcation[i]).toMatch(emailRegex.docsCompletedNotifcation[i]);
      }
    }, 30000);

    // NTP Complteted Notification email
    test('validate NTP Completed Notifcation email text', async () => {
      const email = new LoanEmailPage(emailConfig);
      const ntpCompleteNotification = await email.getEmail('ntpCompleteNotification');
      expect(ntpCompleteNotification).toBeTruthy();
      for (const i in ntpCompleteNotification) {
        expect(ntpCompleteNotification[i]).toMatch(emailRegex.ntpCompleteNotification[i]);
      }
    }, 30000);
  });
});
