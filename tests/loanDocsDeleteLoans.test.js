import each from 'jest-each'
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles'
const PurgeLoansById = require('../src/utilities/purgeByLoanId');


describe('Delete files', () => {

    const loanResults = new LoanDocsResultsFiles()
    const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun()
    const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun()
    const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun()
    const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun()

    each(loanSingleBorrSunRun).test('Delete Single Borrower SunRun Loans', (loanId, done) => {
        console.log("delete ",loanId)
        const purgeLoan = new PurgeLoansById(loanId);
        purgeLoan.purgeLoans();
        done();
    })

    each(loanSingleBorrNonSunRun).test('Delete Single Borrower Non SunRun Loans', (loanId, done) => {
        console.log("delete ",loanId)
        const purgeLoan = new PurgeLoansById(loanId);
        purgeLoan.purgeLoans();
        done();
    })

    each(loanCoBorrSunRun).test('Delete Combined SunRun Loans', (loanId, done) => {
        console.log("delete ",loanId)
        const purgeLoan = new PurgeLoansById(loanId);
        purgeLoan.purgeLoans();
        done();
    })

    each(loanCoBorrNonSunRun).test('Download Combined Non SunRun Loans', (loanId, done) => {
        console.log("delete ",loanId)
        const purgeLoan = new PurgeLoansById(loanId);
        purgeLoan.purgeLoans();
        done();
    })

})