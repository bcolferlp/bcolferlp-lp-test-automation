import LoanDocsResultsFiles from './loanDocsResultFiles'
import PurgeLoansById from './purgeByLoanId'

const loanResults = new LoanDocsResultsFiles();
const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

let loanIds = [];

loanSingleBorrSunRun.forEach(element => {
  loanIds.push(element[0]);
});

loanSingleBorrNonSunRun.forEach(element => {
  loanIds.push(element[0]);
});

loanCoBorrSunRun.forEach(element => {
  loanIds.push(element[0]);
});

loanCoBorrNonSunRun.forEach(element => {
  loanIds.push(element[0]);
});

console.log(loanResults.testNumber)
console.log(loanIds)
// const purgeLoan = new PurgeLoansById(loanIds);
// purgeLoan.purgeLoans();
