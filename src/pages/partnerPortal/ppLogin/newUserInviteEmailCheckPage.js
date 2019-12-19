import EmailAPI from '../../../apis/emailAPI';

const subject = {
  newUserFrom: 'donotreply@loanpal.com',
};

export default class newUserInvites extends EmailAPI {
  async getEmail(mailType) {
    const inbox = await this.getInbox();
    const message = this.getMessage(inbox, subject[mailType]);
    return message.split('\n');
  }
}
