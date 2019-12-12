/*
Initialize class with config
config = {
    imap: {
      user: <EMAIL>,
      password: <PASSWORD>,
      host: 'mail.testemail.loanpal.com',
      port: 993,
      tls: true
    }
  };
*/
const _ = require('underscore');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

export default class EmailAPI {
  constructor(config) {
    this.config = config;
    this.searchCriteria = ['1:100'];
    this.fetchOptions = {
      bodies: ['HEADER', 'TEXT', '']
    };
  }

  async mailConnect() {
    const connection = await imaps.connect(this.config);
    await connection.openBox('INBOX');
    const messages = await connection.search(this.searchCriteria, this.fetchOptions);
    const mail = await Promise.all(
      messages.map(async item => {
        const all = _.find(item.parts, { which: '' });
        const id = item.attributes.uid;
        const idHeader = `Imap-Id: ${id}\r\n`;
        const message = await simpleParser(idHeader + all.body);
        return message;
      })
    );
    return mail;
  }

  async getInbox() {
    // Returns entire inbox
    const mail = await this.mailConnect();
    return mail;
  }

  getSubjects(inbox) {
    return inbox.map(item => item.subject);
  }

  getBodies(inbox) {
    return inbox.map(item => item.text);
  }

  getMessage(inbox, subjectText) {
    for (const mail of inbox) {
      const { subject } = mail;
      if (subject.includes(subjectText)) {
        return mail.text;
      }
    }
    throw new Error('Unable to find email');
  }

  getLine(message, lineText) {
    const messageSplit = message.split('\n');
    const line = messageSplit[messageSplit.findIndex(e => e.includes(lineText))];
    if (line) return line;
    throw new Error('Unable to find desired text within the message');
  }
}
