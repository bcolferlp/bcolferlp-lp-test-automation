import EmailAPI from '../apis/emailAPI';

const subject = {
  docusign: 'Please sign your Solar Loan Docs',
  solarFinancingDecision: 'Solar Financing Decision',
  applicationSubmittedNotification: 'ApplicationSubmitted notification'
};
export default class LoanEmailPage extends EmailAPI {
  async getEmail(mailType) {
    const inbox = await this.getInbox();
    const message = this.getMessage(inbox, subject[mailType]);
    return message.split('\n');
  }
}
