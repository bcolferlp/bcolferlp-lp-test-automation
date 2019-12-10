const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-09-000989'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
