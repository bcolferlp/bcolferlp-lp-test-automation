const request = require('request');

export default class BaseAPI {
    constructor(){
    }
    async apiRequest(url){
        let result = await this.doRequest(url)
        return JSON.parse(result)
    }
    
    doRequest(url){
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
}