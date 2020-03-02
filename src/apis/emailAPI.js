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
        host: 'outlook.office365.com',
        port: 993,
        tls: true,
        authTimeout: 20000
      }
    };
    this.fetchOptions = {
      bodies: ['HEADER', 'TEXT', '']
    };
  }

  // Connects to email with imap
  mailConnect = async (searchCriteria = 'ALL', box = 'INBOX') => {
    const criteria = [searchCriteria];
    const connection = await imaps.connect(this.config);
    await connection.openBox(box);
    const messages = await connection.search(criteria, this.fetchOptions);
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

  getBoxes = async () => {
    const connection = await imaps.connect(this.config);
    const boxes = await connection.getBoxes();
    return boxes;
  };

  deleteMail = async (searchCriteria = 'ALL', box = 'INBOX') => {
    const criteria = [searchCriteria];
    const connection = await imaps.connect(this.config);
    await connection.openBox(box);
    const messages = await connection.search(criteria, this.fetchOptions);
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
  getInbox = (searchCriteria, box) => this.mailConnect(searchCriteria, box).then(mail => mail || Promise.reject(new Error('Unable to retrieve emails')));

  // Returns all email subjects in an array
  getSubjects = inbox => inbox.map(({ subject }) => subject);

  // Returns all email text as an array
  getBodies = inbox => inbox.map(({ html }) => h2t.fromString(html, { wordwrap: false }));

  // Returns email text if subject is found
  getMessage(inbox, subjectText) {
    for (const mail of inbox) {
      const { subject, text, html } = mail;
      if (subject.includes(subjectText)) {
        return h2t.fromString(html, { wordwrap: false });
      }
    }
    throw new Error('Unable to find email');
  }

  getMessagesBySubjects(inbox, subjectText) {
    return inbox.filter(mail => mail.subject.includes(subjectText)).map(({ html }) => h2t.fromString(html, { wordwrap: false }));
  }

  // Returns specific line in the message if the text is included
  getLine(message, lineText) {
    const messageSplit = message.split('\n');
    const line = messageSplit[messageSplit.findIndex(e => e.includes(lineText))];
    if (line) return line;
    throw new Error('Unable to find desired text within the message');
  }
}
