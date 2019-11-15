const request = require('request');

export default class BaseAPI {
    constructor(){
    }

    doGetRequest(url){
        return new Promise(function (resolve, reject){
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                  } else {
                    reject(error);
                  }         
            })
        });
    }

    async apiGetRequest(url){
        let result = await this.doGetRequest(url)
        return JSON.parse(result)
    }

    doPostRequest(url, bodyJson){
        return new Promise(function (resolve, reject){
            request.post(url, bodyJson, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                  } else {
                    reject(error);
                  }         
            })
        });
    }

    async apiPostRequest(url){
        let result = await this.doGetRequest(url)
        return JSON.parse(result)
    }

}