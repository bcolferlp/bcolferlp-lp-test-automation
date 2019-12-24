const PurgeLoansById = require('./purgeByLoanId');

const loanId = [''];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
