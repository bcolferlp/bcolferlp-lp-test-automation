const AWS = require('aws-sdk');

const Lambda = new AWS.Lambda();

const query = async (sqlQuery, stage) => {
  const { Payload } =
    (await Lambda.invoke({
      FunctionName: `loanpal-core-${stage}-auroraProxy`,
      Payload: JSON.stringify({
        queryArgs: sqlQuery,
        multiple: true
      })
    }).promise()) || {};
  // console.log(JSON.parse(Payload));
  return Payload ? JSON.parse(Payload) : [];
};
module.exports.main = query;
