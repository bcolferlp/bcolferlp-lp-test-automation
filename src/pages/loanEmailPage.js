import EmailAPI from '../apis/emailAPI';

const subject = {
  docusign: 'Please sign your Solar Loan Docs',
  completedDocuSign: 'Completed: Please sign your Solar Loan Docs',
  solarFinancingDecision: 'Solar Financing Decision',
  applicationSubmittedNotification: 'ApplicationSubmitted notification',
  approvalNotification: 'Approval notification',
  docsSentNotification: 'DocsSent notification',
  docsSignedNotification: 'DocsSigned notification',
  docsCompletedNotifcation: 'DocsCompleted notification',
  ntpCompleteNotification: 'NtpComplete notification'
};

export default class LoanEmailPage extends EmailAPI {
  async getEmail(inbox, mailType) {
    const message = this.getMessage(inbox, subject[mailType]);
    return message.split('\n');
  }

  async getloanId(mailType, lineText) {
    const inbox = await this.getInbox();
    const message = this.getMessage(inbox, subject[mailType]);
    const line = this.getLine(message, lineText);
    return line;
  }
}
