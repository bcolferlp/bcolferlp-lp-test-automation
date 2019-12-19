import each from 'jest-each'
const LoanDocsResultsFiles = require('../src/utilities/loanDocsResultFiles')
const LoanData = require('../src/utilities/loanData')
const folderResults = path.join(__dirname, '../../data/loanDocs/testResults/');
import DocuSignAPI from '../src/apis/docuSignAPI'


describe('Download DocuSign PDF files', () => {

    const loanResults = new LoanDocsResultsFiles()
    const loanSingleBorrSunRun = loanResults.getLoanSingleBorrSunRun()
    const loanSingleBorrNonSunRun = loanResults.getLoanSingleBorrNonSunRun()
    const loanCoBorrSunRun = loanResults.getLoanCoBorrSunRun()
    const loanCoBorrNonSunRun = loanResults.getLoanCoBorrNonSunRun()

    each(loanSingleBorrSunRun).test.skip('Download Single Borrower SunRun Loans', (loanId, firstName) => {
        console.log(loanId)
        console.log(firstName)
    })

    each(loanSingleBorrNonSunRun).test.skip('Download Single Borrower Non SunRun Loans', (loanId, firstName) => {
        console.log(loanId)
        console.log(firstName)
    })

    each(loanCoBorrSunRun).test('Download Combined SunRun Loans', (loanId, firstName) => {
        const loanData = new LoanData(loanId)
        const envelopeId = await loanData.getEnvelopeId()
        console.log(envelopeId)
        const testNumber = loanResults.testNumber
        const filename = `${folderResults}${testNumber}/${firstName}.pdf`
        const docuSignAPI = new DocuSignAPI(envelopeId)
        const download = await docuSignAPI.downloadDocument(filename)
        expect(download).toBeTruthy()
    })

    each(loanCoBorrNonSunRun).test.skip('Download Combined Non SunRun Loans', (loanId, firstName) => {
        console.log(loanId)
        console.log(firstName)
    })

})