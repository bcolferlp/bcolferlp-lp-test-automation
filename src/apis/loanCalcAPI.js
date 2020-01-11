import BaseAPI from '../base/baseApi';

const urls = require('../utilities/urls');

export default class LoanCalcAPI extends BaseAPI {
  constructor(loanAmount, rate, term, baseItcPct) {
    super();
    this.loanAmount = loanAmount;
    this.rate = rate;
    this.term = term;
    this.baseItcPct = baseItcPct;
  }

  async calcStandardPayment() {
    const url = `${urls.loanCalc}/?loanAmount=`.concat(this.loanAmount, '&rate=', this.rate, '&term=', this.term, '&baseItcPct=', this.baseItcPct);
    const request = await this.apiGetRequest(url);
    return request;
  }
}
