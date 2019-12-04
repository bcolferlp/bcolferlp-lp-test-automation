const LoanData = require('./loanData')

let loanId = '19-08-000939'

async function getLoan(){
    let loanData = new LoanData(loanId)
    let info = await loanData.getEnvelopeId()
    console.log(info)
}

getLoan()







