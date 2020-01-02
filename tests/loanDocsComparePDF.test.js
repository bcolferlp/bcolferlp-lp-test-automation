/* eslint-disable no-unused-vars */
import each from 'jest-each';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';
import RunCommand from '../src/utilities/runCommand';

const { fs, path, _ } = require('../src/utilities/imports');

const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');
const folderDocuSignTemplates = path.join(__dirname, '../data/loanDocs/docuSignTemplates/');
const folderJar = path.join(__dirname, '../src/utilities/');

describe('Compare DocuSign PDF files', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();
  const allLoans = _.concat([], loanSingleBorrSunRun, loanSingleBorrNonSunRun, loanCoBorrSunRun, loanCoBorrNonSunRun);

  each(allLoans).test(
    'Compare DocuSign PDFs',
    async ({ firstName }) => {
      console.log('Comparing docs for', firstName);
      const replacedName = firstName.replace(' & ', '-and-');
      const testFile = `${folderResults}${loanResults.testNumber}/${replacedName}.pdf`;
      const expectedFile = `${folderDocuSignTemplates}${replacedName}-template.pdf`;
      const resultsFolder = `${folderResults}${loanResults.testNumber}/${replacedName}/`;
      if (!fs.existsSync(resultsFolder)) fs.mkdirSync(resultsFolder);
      const command = `java -jar ${folderJar}comparePdf.jar ${testFile} ${expectedFile} ${resultsFolder}`;
      const runComm = new RunCommand(command);
      const result = await runComm.execute();
      const isFolderEmpty = fs.readdirSync(resultsFolder);
      expect(isFolderEmpty.length).toBe(0);
    },
    300000
  );
});
