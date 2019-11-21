import each from 'jest-each'
import LoanAPI from '../src/apis/loanAPI'
import ParsePDF from '../src/utilities/parsePDF'
import TemplateJSON from '../src/utilities/templateJson'


describe('Loan Docs comparison', () => {

each([
        ["SunRun","Lionel","Messi", "10101040 New Camp St", "jreyes@loanpal.com"]
])
.test('Create Loan', async (clientId, firstName, lastName, street, email, done) => {
    let jsonData = new TemplateJSON().updateJson(clientId, firstName, lastName, street, email)
    let loan = await new LoanAPI(jsonData)
    let loanStatus = await loan.getLoanStatus()
    expect(loanStatus).toBe("Approved")
    let loanId = await loan.getLoanId()
    console.log(loanId)
    //let existLoan = await loanApi.doesLoanExist()
    //console.log(existLoan)
    //expect(existLoan).toBe(true)
    done()
}, 5000)

// each([
//     ['./src/utilities/test.pdf','./src/utilities/test.pdf']
//     ])
//     .test('Number of Pages comparison pdfs', async (fileToTest, expectedFile, done) => {
//         const numberofPagesTestFile = await new ParsePDF(fileToTest).getNumberOfPages()
//         const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages()
//         expect(numberofPagesTestFile).toBe(numberofPagesExpected)
//         done()
//         }, 5000)
    
// each([
//     ['./src/utilities/test.pdf','./src/utilities/test.pdf']
//     ])
//     .test('PDF text comparison', async (fileToTest, expectedFile, done) => {
//         const textTestFile = await new ParsePDF(fileToTest).getPdfText()
//         const textExpected = await new ParsePDF(expectedFile).getPdfText()
//         expect(textTestFile).toBe(textExpected)
//         done()
//         }, 5000)
    
    })