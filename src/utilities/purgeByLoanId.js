process.env = {
  ...process.env,
  AWS_REGION: 'us-west-2'
};
const Promise = require('bluebird');
const AWS = require('./aws');

const {
  config,
  DynamoDB: { DocumentClient }
} = AWS;
config.setPromisesDependency(Promise);

class PurgeLoansById {
  constructor(loanids) {
    this.loanids = loanids;
    this.docClient = new DocumentClient();
    this.stage = process.env.STAGE;
  }

  purgeLoans() {
    console.log(`Clearing Loans by LoanId from Stage: ${this.stage}`);
    Promise.resolve(this.loanids).each(id => {
      return new Promise(resolve => {
        Promise.bind()
          .then(() => {
            return this.deleteConsumerPaymentInfo(id);
          })
          .then(() => {
            return this.deleteConsumerStips(id);
          })
          .then(() => {
            return this.deleteContractReview(id);
          })
          .then(() => {
            return this.deleteEmailSent(id);
          })
          .then(() => {
            return this.deleteEvents(id);
          })
          .then(() => {
            return this.deleteInternalStips(id);
          })
          .then(() => {
            return this.deleteLoanNotes(id);
          })
          .then(() => {
            return this.deleteScheduledEvents(id);
          })
          .then(() => {
            this.deleteLoan(id);
          })
          .then(resolve)
          .catch(err => {
            console.log(err);
          });
      });
    });
  }

  deleteLoan(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-loans`;
      this.docClient
        .delete({
          TableName: tableName,
          Key: { id: loanId }
        })
        .promise()
        .then(result => {
          if (result.Attributes) {
            console.log(`${tableName} deleted: (${loanId})`);
          }
        })
        .catch(err => {
          console.log(`Error deleting ${tableName} (${loanId}): `);
          return reject(err);
        });
      return resolve();
    });
  }

  deleteScheduledEvents(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-scheduled-events`;
      this.docClient
        .query({
          TableName: tableName,
          IndexName: 'GSI0',
          KeyConditionExpression: 'loanId = :loanId',
          ExpressionAttributeValues: { ':loanId': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { id: e.id }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.id})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.id}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: `);
          return reject(err);
        });
    });
  }

  deleteLoanNotes(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-loan-notes`;
      this.docClient
        .query({
          TableName: tableName,
          KeyConditionExpression: 'loanid = :loanid',
          ExpressionAttributeValues: { ':loanid': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { loanid: e.loanid, id: e.id }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.loanid}, ${e.id})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.loanid}, ${e.id}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: `);
          return reject(err);
        });
    });
  }

  deleteInternalStips(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-internal-stips`;
      this.docClient
        .query({
          TableName: tableName,
          IndexName: 'InternalStipGSI0',
          KeyConditionExpression: 'loanid = :loanid',
          ExpressionAttributeValues: { ':loanid': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { id: e.id }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.id})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.id}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: `);
          return reject(err);
        });
    });
  }

  deleteEvents(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-events`;
      this.docClient
        .query({
          TableName: tableName,
          IndexName: 'GSI0',
          KeyConditionExpression: 'loanId = :loanid',
          ExpressionAttributeValues: { ':loanid': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { id: e.id }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.loanId}, ${e.timestamp})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.loanId}, ${e.timestamp}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: `);
          return reject(err);
        });
    });
  }

  deleteEmailSent(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-email-sent`;
      this.docClient
        .query({
          TableName: tableName,
          IndexName: 'GSI0',
          KeyConditionExpression: 'loanid = :loanid',
          ExpressionAttributeValues: { ':loanid': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { messageid: e.messageid }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.loanid}, ${e.timestamp})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.loanid}, ${e.timestamp}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: ${err}`);
          return reject(err);
        });
    });
  }

  deleteContractReview(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-contract-review`;
      this.docClient
        .query({
          TableName: tableName,
          KeyConditionExpression: 'loanId = :loanId',
          ExpressionAttributeValues: { ':loanId': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { loanId: e.loanId, timestamp: e.timestamp }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.loanId}, ${e.timestamp})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.loanId}, ${e.timestamp}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: `);
          return reject(err);
        });
    });
  }

  deleteConsumerStips(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-consumer-stips`;
      this.docClient
        .query({
          TableName: tableName,
          IndexName: 'ConsumerStipGSI0',
          KeyConditionExpression: 'loanid = :loanid',
          ExpressionAttributeValues: { ':loanid': loanId }
        })
        .promise()
        .then(result => {
          result.Items.forEach(e => {
            this.docClient
              .delete({
                TableName: tableName,
                Key: { id: e.id }
              })
              .promise()
              .then(() => {
                console.log(`${tableName} deleted: (${e.id})`);
              })
              .catch(err => {
                console.log(`Error deleting ${tableName} (${e.id}): `);
                return reject(err);
              });
          });
          return resolve();
        })
        .catch(err => {
          console.log(`Error Querying ${tableName}: `);
          return reject(err);
        });
    });
  }

  deleteConsumerPaymentInfo(loanId) {
    return new Promise((resolve, reject) => {
      const tableName = `${this.stage}-consumer-payment-info`;
      this.docClient
        .delete({
          TableName: tableName,
          Key: { loanId },
          ReturnValues: 'ALL_OLD'
        })
        .promise()
        .then(result => {
          if (result.Attributes) {
            console.log(`${tableName} deleted: (${loanId})`);
          }
        })
        .catch(err => {
          console.log(`Error deleting ${tableName} (${loanId}): `, err);
          return reject(err);
        });
      return resolve();
    });
  }
}

module.exports = PurgeLoansById;
