import each from 'jest-each';
import LoanDocsResultsFiles from '../src/utilities/loanDocsResultFiles';
import RunCommand from '../src/utilities/runCommand'
import { FSx } from 'aws-sdk';
const { fs, path } = require('../src/utilities/imports');
const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');
const folderDocuSignTemplates = path.join(__dirname, '../data/loanDocs/docuSignTemplates/');
const folderJar = path.join(__dirname, '../src/utilities/');
const _ = require('lodash')

describe('Compare DocuSign PDF files', () => {
  const loanResults = new LoanDocsResultsFiles();
  const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun();
  const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun();
  const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun();
  const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun();
  const allLoans = _.concat([],loanSingleBorrSunRun,loanSingleBorrNonSunRun,loanCoBorrSunRun,loanCoBorrNonSunRun)
  //console.log(allLoans)


  each(allLoans).test('Compare DocuSign PDFs', async ({ loanId, firstName }) => {
    const testFile = `${folderResults}${loanResults.testNumber}/${firstName}.pdf`
    const expectedFile = `${folderDocuSignTemplates}${firstName}-template.pdf`
    const resultsFolder = `${folderResults}${loanResults.testNumber}/${firstName}/`
    if(!fs.existsSync(resultsFolder))fs.mkdirSync(resultsFolder)
    const command = `java -jar ${folderJar}comparePdf.jar ${testFile} ${expectedFile} ${resultsFolder}`
    const runComm =  new RunCommand(command)
    const result = await runComm.execute()
    const isFolderEmpty = fs.readdirSync(resultsFolder)
    expect(isFolderEmpty.length).toBe(0)
  },50000);
})
