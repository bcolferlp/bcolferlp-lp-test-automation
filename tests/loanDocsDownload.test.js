import each from 'jest-each';
import LoanData from '../src/utilities/loanData'
import DocuSignAPI from '../src/apis/docuSignAPI'
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';
const { path } = require('../src/utilities/imports');
const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');

describe('Download DocuSign PDF files', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun() || [];
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun() || [];
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun() || [];
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun() || [];

  each(loanSingleBorrSunRun).test.skip('Download Single Borrower SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });

  each(loanSingleBorrNonSunRun).test.skip('Download Single Borrower Non SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });

  each(loanCoBorrSunRun).test.skip('Download Combined SunRun Loans', async ({ loanId, firstName }) => {
    const loanData = new LoanData(loanId)
    const envelopeId = await loanData.getEnvelopeId()
    console.log(envelopeId)
    const filename = `${folderResults}${loanResults.testNumber}/${firstName}.pdf`
    const docuSignAPI = new DocuSignAPI(envelopeId)
    const download = await docuSignAPI.downloadDocument(filename)
    expect(download).toBeTruthy()
  });

  each(loanCoBorrNonSunRun).test.skip('Download Combined Non SunRun Loans', ({ loanId, firstName }) => {
    console.log(loanId);
    console.log(firstName);
  });
});
