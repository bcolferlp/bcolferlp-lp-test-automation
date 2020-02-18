require('dotenv').config();
const AWS = require('./aws');

const {
  DynamoDB: { DocumentClient }
} = AWS;

class ClientData {
  constructor(clientId) {
    this.clientId = clientId;
    this.stage = process.env.STAGE;
    this.dynamodb = new DocumentClient();
  }

  async getClientConfig() {
    console.log('getClientConfig', this.clientId);
    console.log(`${this.stage}-client-config`);
    const { Items } = await this.dynamodb
      .query({
        TableName: `${this.stage}-client-config`,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': this.clientId }
      })
      .promise();
    return Items;
  }
}

module.exports = ClientData;
