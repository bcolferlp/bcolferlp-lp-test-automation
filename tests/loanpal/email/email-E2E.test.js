/* eslint-disable guard-for-in */
import h2t from 'html-to-text';

import LoanEmailPage from '../../../src/pages/loanEmailPage';

import IP431File from '../../../data/loanpal/application/approved-deferred-stip-data_IP-431.csv';
import PRODFile from '../../../data/loanpal/application/approved-deferred-stip-data_PROD-VERIFY.csv';

const single = IP431File.filter(item => item.type === 'Single');
const primary = IP431File.filter(item => item.type === 'Primary');
const secondary = IP431File.filter(item => item.type === 'Secondary');
const combined = IP431File.filter(item => item.type === 'Combined');

require('dotenv').config();

const emailRegex = require('../../../src/utilities/emailRegex');

const emailConfig = { user: process.env.emailUser, password: process.env.emailPass };

const englishNextSteps12 = require('../../../data/email/deferred-stips/default-english/next-steps_1-2');
const englishNextSteps13 = require('../../../data/email/deferred-stips/default-english/next-steps_1-3');
const englishNextSteps123 = require('../../../data/email/deferred-stips/default-english/next-steps_1-2-3');
const spanishNextSteps12 = require('../../../data/email/deferred-stips/default-spanish/next-steps_1-2');
const spanishNextSteps13 = require('../../../data/email/deferred-stips/default-spanish/next-steps_1-3');
const spanishNextSteps123 = require('../../../data/email/deferred-stips/default-spanish/next-steps_1-2-3');

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
    });

    describe.each(PRODFile)('E2E Deferred Stips Email', record => {
      // Solar Financing Decision email
      // console.log(record);
      test.only.each(['english', 'spanish'])(`Validate %s ${record.scenario} ${record.type} borrower ${record.stips} EMAIL`, async language => {
        console.log(`Validate ${language} ${record.scenario} ${record.type} borrower ${record.stips} EMAIL`);
        const responseBody = JSON.parse(record.responseBody);
        const { availableNextSteps = [] } = responseBody;
        const messages = await email.getAllMessages(inbox, 'solarFinancingDecision', language);
        const stringSteps = availableNextSteps.toString();

        // console.log(messages);
        const [message] = await messages.filter(item => {
          let greeting;
          if (record.status === 'Declined') greeting = language === 'english' ? 'Dear' : 'Estimad(o/a)';
          else greeting = language === 'english' ? 'Congratulations,' : 'Felicidades,';
          if (record.type !== 'Single') return item.includes(`${greeting} ${record.firstName}`) || item.includes(`${greeting} ${record.coFirstName}`);
          return item.includes(`${greeting} ${record.firstName}`);
        });
        console.log(JSON.stringify(message), 'filteredMessages');
        expect(message).toBeTruthy();
        // emailRegex[language].solarFinancingDecisionNextSteps.forEach(ex => expect(message).toMatch(ex));
        if (availableNextSteps.length && record.stips !== 'ID/Fraud-Consumer Statement,Foreclosure Review') {
          console.log(stringSteps, 'availableNextSteps');
          // Next Steps
          // GET_DOCS, UPLOAD, WAIT FOR CALL
          if (stringSteps.includes('GET') && stringSteps.includes('UPLOAD') && !stringSteps.includes('WAIT')) {
            console.log('Assertion 1');
            expect(message).toMatch(emailRegex[language].nextSteps.title);
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
          }
          if (stringSteps.includes('GET') && !stringSteps.includes('UPLOAD') && stringSteps.includes('WAIT')) {
            console.log('Assertion 2');
            expect(message).toMatch(emailRegex[language].nextSteps.title);
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).not.toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).toMatch(ex));
          }
          if (!stringSteps.includes('GET') && stringSteps.includes('UPLOAD') && !stringSteps.includes('WAIT')) {
            console.log('Assertion 3');
            emailRegex[language].nextSteps.none.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).not.toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
          }
          if (stringSteps.includes('GET') && stringSteps.includes('UPLOAD') && stringSteps.includes('WAIT')) {
            console.log('Assertion 4');
            expect(message).toMatch(emailRegex[language].nextSteps.title);
            emailRegex[language].nextSteps.one.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.two.forEach(ex => expect(message).toMatch(ex));
            emailRegex[language].nextSteps.three.forEach(ex => expect(message).toMatch(ex));
          }
        } else {
          console.log('Assertion 5');
          // emailRegex[language].solarFinancingDecision.forEach(ex => expect(message).toMatch(ex));
          emailRegex[language].nextSteps.one.forEach(ex => expect(message).not.toMatch(ex));
          emailRegex[language].nextSteps.two.forEach(ex => expect(message).not.toMatch(ex));
          emailRegex[language].nextSteps.three.forEach(ex => expect(message).not.toMatch(ex));
        }
      });
    });
  });
});
