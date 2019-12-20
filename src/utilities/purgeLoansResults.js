const LoanDocsResultsFiles = require('./loanDocsResultFiles');
const PurgeLoansById = require('./purgeByLoanId');

const loanResults = new LoanDocsResultsFiles();
const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

const loanIds = [];

loanSingleBorrSunRun.forEach(({ loanId }) => {
  loanIds.push(loanId);
});

loanSingleBorrNonSunRun.forEach(({ loanId }) => {
  loanIds.push(loanId);
});

loanCoBorrSunRun.forEach(({ loanId }) => {
  loanIds.push(loanId);
});

loanCoBorrNonSunRun.forEach(({ loanId }) => {
  loanIds.push(loanId);
});

console.log(loanResults.testNumber)
console.log(loanIds)
// const purgeLoan = new PurgeLoansById(loanIds);
// purgeLoan.purgeLoans();