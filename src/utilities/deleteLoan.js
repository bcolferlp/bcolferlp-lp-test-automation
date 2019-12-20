const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-10-001060', '19-02-000985'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
