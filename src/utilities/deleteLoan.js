const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-07-001030', '19-09-001018'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
