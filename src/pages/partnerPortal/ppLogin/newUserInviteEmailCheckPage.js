import EmailAPI from '../../../apis/emailAPI';

const subject = {
  newUserFrom: 'Your temporary password for Loanpal'
};

export default class newUserInvites extends EmailAPI {
  async getEmail(mailType) {
    const inbox = await this.getInbox();
    const message = this.getMessage(inbox, subject[mailType]);
    return message.split('\n');
  }

  async getSplitEmail(inbox, mailType) {
   
    const message = this.getMessage(inbox, subject[mailType]);
    return message.split('\n');
  }
}
