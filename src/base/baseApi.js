const request = require('request');

export default class BaseAPI {
  //   constructor() {}

  doGetRequest(url) {
    return new Promise(function(resolve, reject) {
      request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  async apiGetRequest(url) {
    const result = await this.doGetRequest(url);
    return JSON.parse(result);
  }

  doPostRequest(url, bodyJson) {
    return new Promise(function(resolve) {
      request.post(
        {
          headers: { 'content-type': 'application/json' },
          url,
          body: JSON.stringify(bodyJson, null, 1)
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

  async apiPostRequest(url, bodyJson) {
    const request = await this.doPostRequest(url, bodyJson);
    return request;
  }
}
