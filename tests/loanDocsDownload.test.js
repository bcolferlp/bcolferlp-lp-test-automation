import each from 'jest-each';
import LoanData from '../src/utilities/loanData';
import DocuSignAPI from '../src/apis/docuSignAPI';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';

const { _, path } = require('../src/utilities/imports');

const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');

describe('Download DocuSign PDF files', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();

  const allLoans = _.concat([], loanSingleBorrSunRun, loanSingleBorrNonSunRun, loanCoBorrSunRun, loanCoBorrNonSunRun);
  console.log(allLoans);

  each(allLoans).test(
    '75905: Download DocuSign PDFs',
    async ({ loanId, firstName }) => {
      console.log('Downloading docs for', firstName);
      const replacedName = firstName.replace(' & ', '-and-');
      const loanData = new LoanData(loanId);
      const envelopeId = await loanData.getEnvelopeId();
      console.log(envelopeId);
      const filename = `${folderResults}${loanResults.testNumber}/${replacedName}.pdf`;
      const docuSignAPI = new DocuSignAPI(envelopeId);
      const download = await docuSignAPI.downloadDocument(filename);
      expect(download).toBeTruthy();
    },
    30000
  );
});
