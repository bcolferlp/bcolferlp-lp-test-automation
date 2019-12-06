const PurgeLoansById = require('./purgeByLoanId')


let loanId = ['19-09-000989']
let purgeLoan = new PurgeLoansById(loanId)
purgeLoan.purgeLoans()