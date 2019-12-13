require('dotenv').config();

export default class EmailConfigs {
  constructor() {
    this.rainloop = {
      imap: {
        user: process.env.rainloopUser,
        password: process.env.rainloopPass,
        host: 'mail.testemail.loanpal.com',
        port: 993,
        tls: true
      }
    };
  }
}
