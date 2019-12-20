import LoanDocsResultsFiles from './loanDocsResultFiles'
import PurgeLoansById from './purgeByLoanId'

const loanResults = new LoanDocsResultsFiles();
const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

let loanIds = [];

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
