import BaseTest from "../src/base/baseTest";
import EmailPage from "../src/pages/3rdParty/email/emailPage";
import DocuSignPage from "../src/pages/3rdParty/docuSign/docuSignPage";
import each from 'jest-each'
import LoanAPI from '../src/apis/loanAPI'
import ParsePDF from '../src/utilities/parsePDF'
import TemplateJSON from '../src/utilities/templateJson'
const LoanData = require('../src/utilities/loanData')
import DocuSignAPI from '../src/apis/docuSignAPI'
const singleBorrData = require("../data/loanDocs/singleBorrowerData")
const globals  = require('../src/utilities/globals')
const { By, until } = require("selenium-webdriver");
const folderTestFiles = "C:\\Users\\jreyes\\JS-Projects\\lp-test-automation\\data\\tests\\"

describe('DocuSign Test Suite', () => {
    let baseTest;
  const emailRow = By.xpath('(//*[contains(text(),"Please sign your Solar Loan Docs")])[1]');
  const reviewDocs = By.xpath('//span[contains(text(), "REVIEW")]/../../a');

  beforeEach(async () => {
    baseTest = await new BaseTest("chrome");
  });

  afterEach(async () => {
    await baseTest.close();
  });

    //Note: SunRun loans must have 'source' value. Look at dynamodb>dev-client-config>loanOptionsMap for values. e,g "Costco"
    each(singleBorrData)
        .test('Create Loan', async ({loanType, clientId, firstName, lastName, street, state, email, spokenLanguage, source}, done) => {
            // console.log(email)
            let jsonData = new TemplateJSON().updateJson(clientId, firstName, lastName, street, state, email, spokenLanguage, source)
            console.log(jsonData)
            let loan = new LoanAPI(jsonData)
            let loanStatus = await loan.getLoanStatus()
            expect(loanStatus).toBe("Approved")
            const loanId = await loan.getLoanId()
            console.log(loanId)
            
            const emailPage = await new EmailPage(baseTest.webDriver);
            await emailPage.sleep(10000)
            await emailPage.fullScreen();
            const docuSignPage = await new DocuSignPage(baseTest.webDriver);
            await emailPage.goToEmail();
            await emailPage.emailLogin();
            await emailPage.findEmail(emailRow);
            await emailPage.findEmailLink(reviewDocs);
            await docuSignPage.completeDocs();
            await docuSignPage.closeTabs(baseTest.webDriver);
            await emailPage.emailLogout();

            done()
        }, 300000)


    each([
        ["singleBorrSunRun",'19-09-000980']
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
        ['./data/tests/singleBorrSunRun.pdf', './data/templates/singleBorrSunRunTemplate.pdf']
    ])
        .test.skip('Number of Pages comparison pdfs', async (fileToTest, expectedFile, done) => {
            const numberofPagesTestFile = await new ParsePDF(fileToTest).getNumberOfPages()
            const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages()
            expect(numberofPagesTestFile).toBe(numberofPagesExpected)
            done()
        }, 5000)

    each([
        ['./data/tests/singleBorrSunRun.pdf', './data/templates/singleBorrSunRunTemplate.pdf']
    ])
        .test.skip('PDF text comparison', async (fileToTest, expectedFile, done) => {
            const textTestFile = await new ParsePDF(fileToTest).getPdfText()
            const textExpected = await new ParsePDF(expectedFile).getPdfText()
            expect(textTestFile).toBe(textExpected)
            done()
        }, 5000)

})