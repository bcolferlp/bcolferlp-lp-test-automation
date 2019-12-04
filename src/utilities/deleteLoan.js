const PurgeLoansById = require('./purgeByLoanId')


let loanId = ['19-08-000946']
let purgeLoan = new PurgeLoansById(loanId)
purgeLoan.purgeLoans()