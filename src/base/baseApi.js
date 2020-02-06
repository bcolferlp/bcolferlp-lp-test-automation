const request = require('request');

export default class BaseAPI {
  constructor() {
    this.url;
    this.dataJson;
    this.headers;
  }

  doGetRequest() {
    return new Promise(function(resolve, reject) {
      request(this.url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  async apiGetRequest() {
    const result = await this.doGetRequest(this.url);
    return JSON.parse(result);
  }

  doPostRequest() {
    //Promise don't take headers: this.headers, so we need to define variables
    const headers = this.headers;
    const url = this.url;
    const body = this.dataJson;
    return new Promise(function(resolve) {
      request.post(
        {
          headers,
          url,
          body
        },
        function(error, response, body) {
          const result = new Map();
          result.set('statuscode', '');
          result.set('body', '');
          result.set('error', error);
          if (response !== undefined) result.set('statuscode', response.statusCode);
          if (body !== undefined) result.set('body', body);
          resolve(result);
        }
      );
    });
  }

  async apiPostRequest() {
    const request = await this.doPostRequest();
    return request;
  }
}
