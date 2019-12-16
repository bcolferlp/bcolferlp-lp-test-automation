const imaps = require('imap-simple');
const _ = require('underscore');

const config = {
  imap: {
    user: 'test2@testemail.loanpal.com',
    password: 'Abcd1234!',
    host: 'mail.testemail.loanpal.com',
    port: 993,
    tls: true
    // authTimeout: 3000
  }
};

imaps.connect(config).then(function(connection) {
  return connection.openBox('INBOX').then(function() {
    var searchCriteria = ['1:5'];
    var fetchOptions = {
      bodies: ['HEADER', 'TEXT']
    };
    return connection.search(searchCriteria, fetchOptions).then(function(messages) {
      messages.forEach(function(item) {
        var all = _.find(item.parts, { which: 'TEXT' });
        var html = Buffer.from(all.body, 'base64').toString('ascii');
        console.log(html);
      });
    });
  });
});
