require('dotenv').config();
const AWS = require('aws-sdk');
const Promise = require('bluebird');

const {
  config,
  DynamoDB: { DocumentClient }
} = AWS;
config.setPromisesDependency(Promise);
config.update({ region: 'us-west-2' });

class LoanData {
  constructor(loanid) {
    this.loanId = loanid;
    this.dynamodb = new DocumentClient();
    this.stage = process.env.STAGE;
  }

  async getSrcLoan() {
    return this.dynamodb
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

  async getContractReview() {
    console.log('getContractReview', this.loanId);
    return this.dynamodb
      .query({
        TableName: `${this.stage}-contract-review`,
        KeyConditionExpression: 'loanId = :loanId',
        ExpressionAttributeValues: { ':loanId': this.loanId }
      })
      .promise()
      .get('Items');
  }

  async putLoan(loan) {
    console.log('putLoan', loan.id);
    return this.dynamodb
      .put({
        TableName: `${process.env.STAGE}-loans`,
        Item: loan
      })
      .promise();
  }
}

module.exports = LoanData;
