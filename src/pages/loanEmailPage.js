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
    return message;
  }

  async getSplitEmail(inbox, mailType) {
    const message = this.getMessage(inbox, subject[mailType]);
    return message.split('\n');
  }

  async getLineToValidate(message, lineText) {
    const line = this.getLine(message, lineText);
    return line;
  }

  async getAllMessages(inbox, mailType) {
    const messages = this.getMessagesBySubjects(inbox, subject[mailType]);
    return messages;
  }

  async getLoanDocsLink(inbox, loanId) {
    console.log('Getting loan docs link');
    const emailBodies = await this.getAllMessages(inbox, 'solarFinancingDecision');
    const emailBod = emailBodies.filter(item => item.includes(loanId));
    const emailLink = await this.getLineToValidate(emailBod[0], 'Get your Loan');
    const test = emailLink.match(/http.*$/g);
    let newLink = test[0].replace(/&#x3D;/, '=');
    if (newLink[newLink.length - 1] === '.') newLink = newLink.slice(0, -1);
    return newLink;
  }

  async getDocuSignLink(inbox, firstName) {
    console.log('Getting DocuSign link');
    const emailBodies = await this.getAllMessages(inbox, 'docusign');
    const emailBod = emailBodies.filter(item => item.includes(firstName));
    const emailLink = await this.getLineToValidate(emailBod[0], 'https://demo.docusign.net');
    return emailLink;
  }
}
