require('dotenv').config();
const AWS = require('aws-sdk');
const Promise = require('bluebird');

const {
  config,
  DynamoDB: { DocumentClient }
} = AWS;
config.setPromisesDependency(Promise);
config.update({ region: 'us-west-2' });

class ClientData {
  constructor(clientId) {
    this.clientId = clientId;
    this.dynamodb = new DocumentClient();
    this.stage = process.env.STAGE;
  }

  async getClientConfig() {
    console.log('getClientConfig', this.clientId);
    console.log(`${this.stage}-client-config`);
    return this.dynamodb
      .query({
        TableName: `${this.stage}-client-config`,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': this.clientId }
      })
      .promise()
      .get('Items');
  }
}

module.exports = ClientData;
