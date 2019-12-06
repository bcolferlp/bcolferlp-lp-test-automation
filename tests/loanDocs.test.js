import BaseTest from "../src/base/baseTest";
import EmailPage from "../src/pages/3rdParty/email/emailPage";
import DocuSignPage from "../src/pages/3rdParty/docuSign/docuSignPage";
import each from 'jest-each'
import LoanAPI from '../src/apis/loanAPI'
import ParsePDF from '../src/utilities/parsePDF'
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON'
const LoanData = require('../src/utilities/loanData')
import DocuSignAPI from '../src/apis/docuSignAPI'
const singleBorrData = require("../data/loanDocs/testData/singleBorrowerData")
const folderTestFiles = "/Users/jreyes/JS-Projects/lp-test-automation/data/loanDocs/downloads/"
import CompareFiles from '../src/utilities/compareFiles'

describe('DocuSign Test Suite', () => {
    let baseTest;

    beforeEach(async () => {
        baseTest = await new BaseTest("chrome");
    });

    afterEach(async () => {
        await baseTest.close();
    });

    //Note: SunRun loans must have 'source' value. Look at dynamodb>dev-client-config>loanOptionsMap for values. e,g "Costco"
    each(singleBorrData)
        .test('Create Loan', async ({ loanType, productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail}, done) => {
            let jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail)
            let loan = new LoanAPI(jsonData)
            let loanStatus = await loan.getLoanStatus()
            expect(loanStatus).toBe("Approved")
            const loanId = await loan.getLoanId()
            console.log(loanId)


            const emailPage = await new EmailPage(baseTest.webDriver);
            const docuSignPage = await new DocuSignPage(baseTest.webDriver);
            await emailPage.sleep(10000)
            // Email
            await emailPage.fullScreen();
            await emailPage.goToEmail();
            await emailPage.emailLogin();
            await emailPage.getDocuSignEmail();
            // DocuSign
            await docuSignPage.completeDocs();
            await docuSignPage.closeTabs();
            // Email
            await emailPage.deleteMail();
            await emailPage.emailLogout();

            let loanData = new LoanData(loanId)
            let envelopeId = await loanData.getEnvelopeId()
            console.log(envelopeId)
            // download docusign
            let filename = folderTestFiles + loanType + '.pdf'
            let docuSignAPI = new DocuSignAPI(envelopeId)
            let download = await docuSignAPI.downloadDocument(filename)
            // compare with golden template
            expect(download).toBeTruthy

            done()
        }, 300000)


    each([
        ["singleBorrSunRun", '19-09-000980']
    ])

        .test.skip('Download DocuSign Documents', async (loanType, loanId, done) => {
            let loanData = new LoanData(loanId)
            let envelopeId = await loanData.getEnvelopeId()
            console.log(envelopeId)
            // download docusign
            let filename = folderTestFiles + loanType + '.pdf'
            let docuSignAPI = new DocuSignAPI(envelopeId)
            let download = await docuSignAPI.downloadDocument(filename)
            // compare with golden template
            expect(download).toBeTruthy
            done()
        }, 5000)


    each([
        ['./data/tests/singleBorrSunRun.pdf', './data/docuSignTemplates/singleBorrSunRunTemplate.pdf']
    ])
        .test.skip('Number of Pages comparison pdfs', async (fileToTest, expectedFile, done) => {
            const numberofPagesTestFile = await new ParsePDF(fileToTest).getNumberOfPages()
            const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages()
            expect(numberofPagesTestFile).toBe(numberofPagesExpected)
            done()
        }, 5000)

    each([
        ['./data/tests/singleBorrSunRun.pdf', './data/docuSignTemplates/singleBorrSunRunTemplate.pdf']
    ])
        .test.skip('PDF text comparison', async (fileToTest, expectedFile, done) => {
            const textTestFile = await new ParsePDF(fileToTest).getPdfText()
            const textExpected = await new ParsePDF(expectedFile).getPdfText()
            let compareFiles = new CompareFiles(textTestFile, textExpected)
            compareFiles.compare()
            done()
        }, 5000)

})