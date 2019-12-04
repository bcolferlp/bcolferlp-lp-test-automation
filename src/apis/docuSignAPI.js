const request = require('request')
var fs = require('fs')
const callback = () => {}


export default class DocuSignAPI {

    constructor(envelopeId){
        this.envelopeId = envelopeId
    }

    doGetRequest(url, filename){
        return new Promise(function (resolve, reject){
            request({
                url: url,
                headers: {
                    "Content-type": "applcation/pdf",
                    "X-DocuSign-Authentication": '{"Username": "bfieber@loanpal.com", "Password": "All4nada!", "IntegratorKey": "ef5ad7ca-ac50-49b1-a761-fd53165a1c3a" }'
                }
            }, function (error, response, body) {
                console.log('error:', error)
                resolve()
            })
                .pipe(fs.createWriteStream(filename).on('close', callback))
        });
    }


    async downloadDocument(filename){
        const url = 'https://demo.docusign.net/restapi/v2/accounts/2786952//envelopes/'+this.envelopeId+'/documents/combined'
        try{
            await this.doGetRequest(url, filename)
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }
}