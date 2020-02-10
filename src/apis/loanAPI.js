import BaseAPI from '../base/baseApi';

const { urls } = require('../utilities/imports');

export default class LoanAPI extends BaseAPI {
  constructor(dataJson) {
    super();
    this.url = urls.loanCreate;
    this.headers = { 'content-type': 'application/json' };
    this.dataJson = JSON.stringify(dataJson, null, 1);
    this.loanData = this.createLoan();
  }

  async createLoan() {
    // Constructs the url request based on stage
    const result = await this.apiPostRequest();
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
