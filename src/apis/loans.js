import BaseAPI from '../base/baseApi'

export default class Loan extends BaseAPI {

    constructor(dataJson){
        super()
        this.dataJson = dataJson       
    }

    async createLoan(){
        const url = 'https://api.loanpal.com/dev/restapi/v1/applications'
        return await this.apiPostRequest(url)
    }

}