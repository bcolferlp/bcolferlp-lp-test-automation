import each from 'jest-each';

import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

describe('Download DocuSign PDF files', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun() || [];
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun() || [];
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun() || [];
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun() || [];

  each(loanSingleBorrSunRun).test('Download Single Borrower SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });

  each(loanSingleBorrNonSunRun).test('Download Single Borrower Non SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });

  each(loanCoBorrSunRun).test('Download Combined SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });

  each(loanCoBorrNonSunRun).test('Download Combined Non SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });
});
