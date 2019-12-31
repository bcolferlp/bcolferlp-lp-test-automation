import EmailAPI from '../apis/emailAPI';

const _ = require('lodash');

const subject = {
  docusign: { english: 'Please sign your Solar Loan Docs', spanish: 'Por favor firme los documentos de su préstamo para su sistema solar.' },
  completedDocuSign: { english: 'Completed: Please sign your Solar Loan Docs', spanish: 'Completed: Please sign your Solar Loan Docs' },
  solarFinancingDecision: { english: 'Solar Financing Decision', spanish: 'Solar Financing Decision' },
  applicationSubmittedNotification: { english: 'ApplicationSubmitted notification', spanish: 'ApplicationSubmitted notification' },
  approvalNotification: { english: 'Approval notification', spanish: 'Approval notification' },
  docsSentNotification: { english: 'DocsSent notification', spanish: 'DocsSent notification' },
  docsSignedNotification: { english: 'DocsSigned notification', spanish: 'DocsSigned notification' },
  docsCompletedNotifcation: { english: 'DocsCompleted notification', spanish: 'DocsCompleted notification' },
  ntpCompleteNotification: { english: 'NtpComplete notification', spanish: 'NtpComplete notification' },
  newUserFrom: { english: 'Your temporary password for Loanpal', spanish: 'Your temporary password for Loanpal' }
};

export default class LoanEmailPage extends EmailAPI {
  async getEmail(inbox, mailType) {
    const message = this.getMessage(inbox, subject[mailType]);
    return message;
  }

  async getSplitEmail(inbox, mailType) {
    // console.log("inbox",inbox);
    const message = this.getMessage(inbox, subject[mailType]);
    console.log('Message', message);
    return message.split('\n');
  }

  async getLineToValidate(message, lineText) {
    const line = this.getLine(message, lineText);
    return line;
  }

  async getAllMessages(inbox, mailType, spokenLanguage) {
    const subjectText = _.get(subject, `${mailType}.${spokenLanguage}`);
    const messages = this.getMessagesBySubjects(inbox, subjectText);
    return messages;
  }

  async getLoanDocsLink(inbox, { loanId, spokenLanguage }) {
    console.log('Getting loan docs link');
    const emailBodies = await this.getAllMessages(inbox, 'solarFinancingDecision', spokenLanguage);
    const emailBod = emailBodies.filter(item => item.includes(loanId));
    const emailLink = await this.getLineToValidate(emailBod[0], 'https://dev-partner-admin.loanpal.com');
    const test = emailLink.match(/http.*$/g);
    let newLink = test[0].replace(/&#x3D;/, '=');
    if (newLink[newLink.length - 1] === '.') newLink = newLink.slice(0, -1);
    console.log(newLink);
    return newLink;
  }

  async getDocuSignLink(inbox, { firstName, spokenLanguage }) {
    // console.log('Getting DocuSign link', firstName, spokenLanguage);
    const emailBodies = await this.getAllMessages(inbox, 'docusign', spokenLanguage);
    const emailBod = emailBodies.filter(item => item.includes(firstName));
    const emailLink = await this.getLineToValidate(emailBod[0], 'https://demo.docusign.net');
    console.log(emailLink);
    return emailLink;
  }
}
