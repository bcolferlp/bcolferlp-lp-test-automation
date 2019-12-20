const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-11-001049'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
