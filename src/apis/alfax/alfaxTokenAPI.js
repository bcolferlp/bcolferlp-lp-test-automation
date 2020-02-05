import BaseAPI from '../../base/baseApi';

export default class AlfaTokenAPI extends BaseAPI {
  constructor() {
    super();
    this.url = 'http://alfax-1472557379.us-west-2.elb.amazonaws.com/api/v1/Utils/login';
    this.headers = { 'content-type': 'application/json-patch+json' };
    this.dataJson = '{\n    "username": "admin",\n    "password": "123"\n}';
  }

  async getToken() {
    const result = await this.apiPostRequest();
    const statuscode = await result.get('statuscode');
    console.log(result);
    if (statuscode == 200) {
      const body = await JSON.parse(result.get('body'));
      const data = body.data;
      const token = data.token;
      return token;
    } else {
      const error = `Error: ${statuscode} ${result.get('error')}`;
      return error;
    }
  }
}
