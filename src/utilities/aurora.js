const AWS = require('./aws');

const Lambda = new AWS.Lambda();

class Aurora {
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
    return Payload ? JSON.parse(Payload) : [];
  }
}
module.exports = Aurora;
