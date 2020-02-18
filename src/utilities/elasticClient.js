const ES = require('elasticsearch');
const HttpAWSES = require('http-aws-es');
const bodybuilder = require('bodybuilder');
const AWS = require('./aws');
const format = require('./format');

class ElasticClient {
  async executeQuery({ index, source: _source, body, size = 20 }) {
    const stage = process.env.STAGE;
    const ssm = new AWS.SSM();
    const { Parameter } = await ssm.getParameter({ Name: `/${stage}/env/elasticsearch-url` }).promise();
    const client = new ES.Client({
      hosts: Parameter.Value,
      connectionClass: HttpAWSES
    });

    const results = await client.search({ index, type: '_doc', size, _source, body });
    return results.hits.hits.map(({ _source }) => _source);
  }

  async getActiveLoans(ssn) {
    if (!ssn.includes('-')) ssn = format.ssnDash(ssn);
    console.log('Searching active loans for', ssn);
    const body = bodybuilder()
      .size(1000)
      .filter('match', 'application.applicant.ssn', ssn)
      .notFilter('match', 'loanStatus.application', 'Declined')
      .notFilter('match', 'loanStatus.application', 'Canceled')
      .build();
    const results = await this.executeQuery({ index: 'loans', size: 1000, source: ['id'], body });
    return results;
  }
}
// beforeEach
module.exports = ElasticClient;
