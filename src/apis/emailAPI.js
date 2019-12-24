import _ from 'underscore';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import h2t from 'html-to-text';

export default class EmailAPI {
  /**
   * Class requires an Object for the email connection
   * @param user
   * @param password
   */
  constructor({ user, password }) {
    this.config = {
      imap: {
        user,
        password,
        host: 'mail.testemail.loanpal.com',
        port: 993,
        tls: true,
        authTimeout: 20000
      }
    };
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

  deleteMail = async () => {
    const connection = await imaps.connect(this.config);
    await connection.openBox('INBOX');
    const messages = await connection.search(this.searchCriteria, this.fetchOptions);
    const taskList = messages.map(message => {
      return new Promise((resolve, reject) => {
        try {
          connection.delFlags(message.attributes.uid, '\\Flagged', err => {
            if (err) console.info(err);
          });
          connection.addFlags(message.attributes.uid, ['\\Seen', '\\Deleted'], err => {
            if (err) {
              console.warn('Error deleting email %s msg: %s', message.attributes.uid, err);
              reject(err);
            }
            resolve();
          });
        } catch (err) {
          console.warn(err);
        }
      });
    });
    return Promise.all(taskList).then(() => {
      connection.imap.closeBox(true, err => {
        if (err) {
          console.warn({
            msg: 'Could not delete messages!',
            erro: err
          });
        }
      });
      connection.end();
    });
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
      const { subject, text, html } = mail;
      let newText = text;
      if (subject.includes(subjectText)) {
        if (!newText) newText = h2t.fromString(html);
        return newText;
      }
    }
    throw new Error('Unable to find email');
  }

  getMessagesBySubjects(inbox, subjectText) {
    return inbox.filter(mail => mail.subject.includes(subjectText)).map(mail => mail.text);
  }

  // Returns specific line in the message if the text is included
  getLine(message, lineText) {
    const messageSplit = message.split('\n');
    const line = messageSplit[messageSplit.findIndex(e => e.includes(lineText))];
    if (line) return line;
    throw new Error('Unable to find desired text within the message');
  }
}
