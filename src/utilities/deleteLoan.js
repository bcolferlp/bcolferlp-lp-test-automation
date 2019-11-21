const PurgeLoansById = require('./purgeByLoanId')


let loanId = ['19-02-000947','19-03-001022','19-01-000951','19-09-000971','19-10-001022']
let purgeLoan = new PurgeLoansById(loanId)
purgeLoan.purgeLoans()