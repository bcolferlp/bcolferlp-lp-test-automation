import BaseAPI from '../base/baseApi'

export default class LoanAPI extends BaseAPI {

    constructor(dataJson){
        super()
        this.dataJson = dataJson
        this.loanData = this.createLoan()      
    }

    async createLoan(){
        const url = 'https://api.loanpal.com/dev/restapi/v1/public/applications/'
        let result = await this.apiPostRequest(url, this.dataJson)
        console.log(result)
        return result
    }

    async getError(){
        let ld = await this.loanData
        return await ld.get("error")
    }

    async getStatusCode(){
        let ld = await this.loanData
        return await ld.get("statuscode")
    }

    async getBody(){
        let ld = await this.loanData
        return await JSON.parse(ld.get("body"))
    }

    async getLoanId(){
        let body = await this.getBody()
        return body.loanId
    }

    async getLoanStatus(){
        let body = await this.getBody()
        return body.status
    }

}