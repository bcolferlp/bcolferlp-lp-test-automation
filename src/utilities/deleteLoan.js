const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-10-001048'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
