const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['20-07-004211'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
