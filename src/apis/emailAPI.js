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
    this.searchCriteria = ['ALL'];
    this.fetchOptions = {
      bodies: ['HEADER', 'TEXT', '']
    };
  }

  // Connects to email with imap
  mailConnect = async () => {
    const connection = await imaps.connect(this.config);
    await connection.openBox('INBOX');
    const messages = await connection.search(this.searchCriteria, this.fetchOptions);
    connection.end();
    const mail = await Promise.all(
      messages.map(item => {
        const all = _.find(item.parts, { which: '' });
        const id = item.attributes.uid;
        const idHeader = `Imap-Id: ${id}\r\n`;
        return simpleParser(idHeader + all.body);
      })
    );
    return mail;
  };

  // Returns entire inbox
  getInbox = () => this.mailConnect().then(mail => mail || Promise.reject(new Error('Unable to retrieve emails')));

  // Returns all email subjects in an array
  getSubjects = inbox => inbox.map(({ subject }) => subject);

  // Returns all email text as an array
  getBodies = inbox => inbox.map(({ text }) => text);

  // Returns email text if subject is found
  getMessage(inbox, subjectText) {
    for (const mail of inbox) {
      const { subject } = mail;
      if (subject.includes(subjectText)) {
        return mail.text;
      }
    }
    throw new Error('Unable to find email');
  }

  // Returns specific line in the message if the text is included
  getLine(message, lineText) {
    const messageSplit = message.split('\n');
    const line = messageSplit[messageSplit.findIndex(e => e.includes(lineText))];
    if (line) return line;
    throw new Error('Unable to find desired text within the message');
  }
}
