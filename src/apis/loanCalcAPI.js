import BaseAPI from '../base/baseApi'

export default class LoanCalcAPI extends BaseAPI {

    constructor(loanAmount, rate, term, baseItcPct){
        super()
        this.loanAmount = loanAmount
        this.rate = rate
        this.term = term
        this.baseItcPct = baseItcPct        
    }

    async calcStandardPayment(){
        const url = 'https://test-clientapi.loanpal.com/test/restapi/v1/loanCalc/?loanAmount='.concat(this.loanAmount,'&rate=',this.rate,'&term=',this.term,'&baseItcPct=',this.baseItcPct)
        return await this.apiRequest(url)
    }

}