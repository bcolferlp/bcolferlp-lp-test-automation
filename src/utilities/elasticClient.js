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

  async getActiveLoans(input) {
    const ssn = input.includes('-') ? input : format.ssnDash(input);
    console.log('Searching active loans for', ssn);
    const body = bodybuilder()
      .orFilter('match', 'application.applicant.ssn.keyword', ssn)
      .orFilter('match', 'application.applicant.ssn.keyword', input)
      .notFilter('match', 'loanStatus.application', 'Declined')
      .notFilter('match', 'loanStatus.application', 'Canceled')
      .size(1000)
      .build();
    const results = await this.executeQuery({ index: 'loans', size: 1000, source: ['id', 'application.applicant.ssn'], body });
    return results.filter(x => x.application.applicant.ssn === ssn || x.application.applicant.ssn === input).map(x => x.id);
  }
}
// beforeEach
module.exports = ElasticClient;
