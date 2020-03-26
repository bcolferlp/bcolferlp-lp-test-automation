require('dotenv').config();

const AWS = require('../utilities/aws');

const {
  DynamoDB: { DocumentClient }
} = AWS;

class LoanData {
  constructor(loanid) {
    this.loanId = loanid;
    this.dynamodb = new DocumentClient();
    this.stage = process.env.STAGE;
  }

  async getSrcLoan() {
    const { Item } = await this.dynamodb.get({ TableName: `${this.stage}-loans`, Key: { id: this.loanId } }).promise();
    return Item;
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
    const { Items } = await this.dynamodb
      .query({
        TableName: `${this.stage}-contract-review`,
        KeyConditionExpression: 'loanId = :loanId',
        ExpressionAttributeValues: { ':loanId': this.loanId }
      })
      .promise();
    return Items;
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
