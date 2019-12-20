const LoanDocsResultsFiles = require('./loanDocsResultFiles');
const PurgeLoansById = require('./purgeByLoanId');

const loanResults = new LoanDocsResultsFiles();
const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

const loanIds = [];

loanSingleBorrSunRun.forEach(element => {
  loanIds.push(element);
});

loanSingleBorrNonSunRun.forEach(element => {
  loanIds.push(element);
});

loanCoBorrSunRun.forEach(element => {
  loanIds.push(element);
});

loanCoBorrNonSunRun.forEach(element => {
  loanIds.push(element);
});

const purgeLoan = new PurgeLoansById(loanIds);
purgeLoan.purgeLoans();
