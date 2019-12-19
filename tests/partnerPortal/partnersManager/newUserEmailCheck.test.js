/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable guard-for-in */
import newUserInvites from '../../../src/pages/partnerPortal/ppLogin/newUserInviteEmailCheckPage';

require('dotenv').config();

const emailHarmony = require('../../../src/utilities/emailHarmony');

const emailConfig = { user: process.env.harmonyEmailID, password: process.env.harmonyPass };

describe('Email', () => {
  describe('Email text validation', () => {
    // New User Invitation - partners-manager
    test('Validate New User Invitation', async () => {
      const email = new newUserInvites(emailConfig);
      const newUserInviteEmail = await email.getEmail('newUserFrom');
      expect(newUserInviteEmail).toBeTruthy();
      for (const i in newUserInviteEmail) {
        expect(newUserInviteEmail[i]).toMatch(emailHarmony.newUserInviteEmail[i]);
      }
    }, 30000);
  });
});
