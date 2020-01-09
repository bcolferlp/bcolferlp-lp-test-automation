import BaseAPI from '../base/baseApi';

require('dotenv').config();

export default class LoanAPI extends BaseAPI {
  constructor(dataJson) {
    super();
    this.dataJson = dataJson;
    this.loanData = this.createLoan();
  }

  async createLoan() {
    // Constructs the url request based on stage
    const stage = process.env.STAGE;
    let preface = '';
    if (stage !== 'dev' && stage !== 'prod') {
      preface = `${stage}-client`;
    }
    const url = `https://${preface}api.loanpal.com/${stage}/restapi/v1/public/applications/`;
    const result = await this.apiPostRequest(url, this.dataJson);
    console.log(result);
    return result;
  }

  async getError() {
    const ld = await this.loanData;
    const error = await ld.get('error');
    return error;
  }

  async getStatusCode() {
    const ld = await this.loanData;
    const statusCode = await ld.get('statuscode');
    return statusCode;
  }

  async getBody() {
    const ld = await this.loanData;
    const body = await JSON.parse(ld.get('body'));
    return body;
  }

  async getLoanId() {
    const body = await this.getBody();
    return body.loanId;
  }

  async getLoanStatus() {
    const body = await this.getBody();
    return body.status;
  }
}
