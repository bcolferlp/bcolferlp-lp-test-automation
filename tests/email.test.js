/* eslint-disable guard-for-in */
import h2t from 'html-to-text';

import LoanEmailPage from '../src/pages/loanEmailPage';

import IP431File from '../data/loanpal/application/approved-deferred-stip-data_IP-431.csv';

const sbScenarios = [...IP431File.slice(0, 8), ...IP431File.slice(32, 40), ...IP431File.slice(64, 68), ...IP431File.slice(80, 83), ...IP431File.slice(92, 108)];

require('dotenv').config();

const emailRegex = require('../src/utilities/emailRegex');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };

const englishNextSteps12 = require('../data/email/deferred-stips/default-english/next-steps_1-2');
const englishNextSteps13 = require('../data/email/deferred-stips/default-english/next-steps_1-3');
const englishNextSteps123 = require('../data/email/deferred-stips/default-english/next-steps_1-2-3');
const spanishNextSteps12 = require('../data/email/deferred-stips/default-spanish/next-steps_1-2');
const spanishNextSteps13 = require('../data/email/deferred-stips/default-spanish/next-steps_1-3');
const spanishNextSteps123 = require('../data/email/deferred-stips/default-spanish/next-steps_1-2-3');

jest.setTimeout(60000);
describe('Email', () => {
  describe.only('Check Inbox', () => {
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
        for (const expression of emailRegex['english'].solarFinancingDecisionNextSteps) {
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

    describe.only.each(IP431File.slice(32, 64))('IP-431', record => {
      // Solar Financing Decision email
      test.only(`Validate ${record.scenario} for a ${record.type}`, async () => {
        const language = 'english';
        const responseBody = JSON.parse(record.responseBody);
        const { availableNextSteps = [] } = responseBody;
        const messages = await email.getAllMessages(inbox, 'solarFinancingDecision', language);
        const stringSteps = availableNextSteps.toString();
        console.log(stringSteps, 'availableNextSteps');

        // console.log(messages);
        const [message] = await messages.filter(
          item => item.includes(`Congratulations, ${record.firstName}`) || item.includes(`Congratulations, ${record.coFirstName}`)
        );
        // console.log(message, 'filteredMessages');
        expect(message).toBeTruthy();
        // emailRegex[language].solarFinancingDecisionNextSteps.forEach(ex => expect(message).toMatch(ex));
        if (availableNextSteps.length && !record.stips === 'ID/Fraud-Consumer Statement,Foreclosure Review') {
          // Next Steps
          if (!record.hasNonDeferredStips) expect(message).toMatch(emailRegex[language].nextSteps.title);
          if (stringSteps.includes('GET') && stringSteps.includes('UPLOAD') && !stringSteps.includes('WAIT')) {
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
          }
          if (stringSteps.includes('GET') && !stringSteps.includes('UPLOAD') && stringSteps.includes('WAIT')) {
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).not.toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).toMatch(ex));
          }
          if (!stringSteps.includes('GET') && stringSteps.includes('UPLOAD') && !stringSteps.includes('WAIT')) {
            emailRegex[language].nextSteps.none.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).not.toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).not.toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
          }
          if (stringSteps.includes('GET') && stringSteps.includes('UPLOAD') && stringSteps.includes('WAIT')) {
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).toMatch(ex));
          }
        } else {
          // emailRegex[language].solarFinancingDecision.forEach(ex => expect(message).toMatch(ex));
          emailRegex[language].nextSteps.one.forEach(ex => expect(message).not.toMatch(ex));
          emailRegex[language].nextSteps.two.forEach(ex => expect(message).not.toMatch(ex));
          emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
        }
      });
    });
  });
  describe.each(['english', 'spanish'])('html text validation, IP-449', language => {
    let nextStep12;
    let nextStep13;
    let nextStep123;
    beforeEach(() => {
      console.log(language, 'language');
      nextStep12 = language === 'english' ? englishNextSteps12 : spanishNextSteps12;
      nextStep13 = language === 'english' ? englishNextSteps13 : spanishNextSteps13;
      nextStep123 = language === 'english' ? englishNextSteps123 : spanishNextSteps123;
    });

    test(`validate ${language} Solar Financing Decision with Next Steps 1,2`, () => {
      const message = h2t.fromString(nextStep12, { wordwrap: false });
      // console.log(message);
      emailRegex[language].solarFinancingDecisionNextSteps.forEach(ex => expect(message).toMatch(ex));
      // Next Steps
      expect(message).toMatch(emailRegex[language].nextSteps.title);
      emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
      emailRegex[language].nextSteps.two.forEach(ex => expect(message).toMatch(ex));
      emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
    });
    test(`validate ${language} Solar Financing Decision with Next Steps 1,3`, () => {
      const message = h2t.fromString(nextStep13, { wordwrap: false });
      // console.log(message);
      emailRegex[language].solarFinancingDecisionNextSteps.forEach(ex => expect(message).toMatch(ex));
      // Next Steps
      expect(message).toMatch(emailRegex[language].nextSteps.title);
      emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
      emailRegex[language].nextSteps.two.forEach(ex => expect(message).not.toMatch(ex));
      emailRegex[language].nextSteps.three.forEach(ex => expect(message).toMatch(ex));
    });
    test(`validate ${language} Solar Financing Decision with Next Steps 1,2,3`, () => {
      const message = h2t.fromString(nextStep123, { wordwrap: false });
      // console.log(message);
      emailRegex[language].solarFinancingDecisionNextSteps.forEach(ex => expect(message).toMatch(ex));
      // Next Steps
      expect(message).toMatch(emailRegex[language].nextSteps.title);
      emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
      emailRegex[language].nextSteps.two.forEach(ex => expect(message).toMatch(ex));
      emailRegex[language].nextSteps.three.forEach(ex => expect(message).toMatch(ex));
    });
  });
});
