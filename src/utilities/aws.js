const AWS = require('aws-sdk');

const { config } = AWS;
config.update({ region: 'us-west-2' });

const credentials = new AWS.SharedIniFileCredentials({
  profile: `${process.env.STAGE}-profile`
});
AWS.config.credentials = credentials;

module.exports = AWS;
