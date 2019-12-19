const PurgeLoansById = require('./purgeByLoanId');

const loanId = ['19-11-001039','19-02-000971','19-13-000993', '19-11-001038', '19-10-001052', '19-11-001037', '19-09-001002'];
const purgeLoan = new PurgeLoansById(loanId);
purgeLoan.purgeLoans();
