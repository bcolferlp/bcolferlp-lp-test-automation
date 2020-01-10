const AWS = require('aws-sdk');

const Lambda = new AWS.Lambda();

export default class Aurora {
  constructor(sqlQuery) {
    this.sqlQuery = sqlQuery;
  }

  async getPayload() {
    const { Payload } =
      (await Lambda.invoke({
        FunctionName: `loanpal-core-${process.env.STAGE}-auroraProxy`,
        Payload: JSON.stringify({
          queryArgs: this.sqlQuery,
          multiple: true
        })
      }).promise()) || {};
    // console.log(JSON.parse(Payload));
    return Payload ? JSON.parse(Payload) : [];
  }
}
