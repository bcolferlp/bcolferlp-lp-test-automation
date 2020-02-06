import BaseAPI from '../../base/baseApi';
import AlfaTokenAPI from './alfaxTokenAPI';

export default class AlfaExampleAPI extends BaseAPI {
  constructor(token, dataJson) {
    super();
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    this.url = 'http://alfax-1472557379.us-west-2.elb.amazonaws.com/api/Evaluation/evaluate';
    this.dataJson = dataJson;
  }

  async getResults() {
    const results = await this.apiPostRequest();
    return results;
  }
}
