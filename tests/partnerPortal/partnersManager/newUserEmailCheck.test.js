/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable guard-for-in */
// import newUserInvites from '../../../src/pages/partnerPortal/ppLogin/newUserInviteEmailCheckPage';
import LoanEmailPage from '../../../src/pages/loanEmailPage';

require('dotenv').config();

const emailHarmony = require('../../../src/utilities/emailHarmony');

const emailConfig = { user: process.env.harmonyEmailID, password: process.env.harmonyPass };

describe('Email', () => {
  describe('Email text validation', () => {
    let email;
    let inbox;
    beforeAll(async () => {
      email = new LoanEmailPage(emailConfig);
      inbox = await email.getInbox();
    });
    // New User Invitation - partners-manager
    test('Validate New User Invitation', async () => {
     
      const newUserInviteEmail = await email.getSplitEmail(inbox, 'newUserFrom');
      expect(newUserInviteEmail).toBeTruthy();
      for (const i in newUserInviteEmail) {
        expect(newUserInviteEmail[i]).toMatch(emailHarmony.newUserFrom[i]);
      }
    }, 30000);
  });
});
