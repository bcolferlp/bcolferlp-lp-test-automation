const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-08-001002', '19-05-001028', '19-16-001072', '19-04-001015', '19-02-001011'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
