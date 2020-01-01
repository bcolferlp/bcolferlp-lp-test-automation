import each from 'jest-each';
import LoanData from '../src/utilities/loanData';
import DocuSignAPI from '../src/apis/docuSignAPI';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';
const { path } = require('../src/utilities/imports');
const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');
const _ = require('lodash');

describe('Download DocuSign PDF files', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

  const allLoans = _.concat([], loanSingleBorrSunRun, loanSingleBorrNonSunRun, loanCoBorrSunRun, loanCoBorrNonSunRun);
  console.log(allLoans);

  each(allLoans).test(
    '75671: Download DocuSign PDFs',
    async ({ loanId, firstName }) => {
      const loanData = new LoanData(loanId);
      const envelopeId = await loanData.getEnvelopeId();
      console.log(envelopeId);
      const filename = `${folderResults}${loanResults.testNumber}/${firstName}.pdf`;
      const docuSignAPI = new DocuSignAPI(envelopeId);
      const download = await docuSignAPI.downloadDocument(filename);
      expect(download).toBeTruthy();
    },
    30000
  );
});
