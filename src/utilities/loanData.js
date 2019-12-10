const AWS = require('aws-sdk');
const Promise = require('bluebird');

const {
  config,
  DynamoDB: { DocumentClient }
} = AWS;
config.setPromisesDependency(Promise);
config.update({ region: 'us-west-2' });

const dynamodb = new DocumentClient();

class LoanData {
  constructor(loanid) {
    this.loanId = loanid;
    this.docClient = new DocumentClient();
    this.stage = 'dev';
  }

  async getSrcLoan() {
    return dynamodb
      .get({ TableName: `${this.stage}-loans`, Key: { id: this.loanId } })
      .promise()
      .get('Item');
  }

  async getLoanData() {
    const loanItem = await this.getSrcLoan();
    return loanItem;
  }

  async getEnvelopeId() {
    const loanItem = await this.getLoanData();
    const envelopeId = loanItem.paymentInfo.docusignEnvelopeId;
    return envelopeId;
  }
}

module.exports = LoanData;
