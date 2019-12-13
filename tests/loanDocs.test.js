import each from 'jest-each';
import BaseTest from '../src/base/baseTest';
import EmailPage from '../src/pages/3rdParty/email/emailPage';
import DocuSignPage from '../src/pages/3rdParty/docuSign/docuSignPage';
import LoanAPI from '../src/apis/loanAPI';
import ParsePDF from '../src/utilities/parsePDF';
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON';
import CoBorrowerJSON from '../src/utilities/coBorrowerJSON';
import DocuSignAPI from '../src/apis/docuSignAPI';
import CompareLoanDocs from '../src/utilities/compareLoanDocs';
import EmailAPI from '../src/apis/emailAPI';

const { path, parseCSV } = require('../src/utilities/imports');
const LoanData = require('../src/utilities/loanData');
const singleBorrData = require('../data/loanDocs/testData/singleBorrowerDataJose');

const folderTestFiles = path.join(__dirname, '../data/loanDocs/downloads/');
const expectedFile = path.join(__dirname, '../data/loanDocs/docuSignTemplates/singleBorrSunRunTemplate.pdf');
const csvFile = path.join(__dirname, '../data/loanDocs/testData/loanDocsData.csv');
const csvFileCoBo = path.join(__dirname, '../data/loanDocs/testData/loanDocsData-co-bo.csv');

describe('loan docs', () => {
  // Parse test block
  describe('Email test', () => {
    test('testing email return', async () => {
      const emailConfig = {
        imap: {
          user: process.env.emailUser,
          password: process.env.emailPass,
          host: 'mail.testemail.loanpal.com',
          port: 993,
          tls: true
        }
      };
      const email = new EmailAPI(emailConfig);
      const inbox = await email.getInbox();
      const message = email.getMessage(inbox, '2');
      const line = email.getLine(message, 'useful');
      console.log('line:', line);
      expect(line).toEqual('this will be a useful class');
    }, 30000);
  });
  describe.skip('Parse data', () => {
    test('testing csv data', async done => {
      const parsedData = await parseCSV(csvFileCoBo);
      const {
        productType,
        language,
        state,
        client,
        borrowerFname,
        borrowerLname,
        address,
        borrowerEmail,
        coboFname,
        coboLname,
        coboAddress,
        coboState,
        coboEmail,
        salesRepEmail,
        bucket,
        key
      } = parsedData[0];
      const jsonData = new CoBorrowerJSON().updateJson(
        productType,
        language,
        state,
        client,
        borrowerFname,
        borrowerLname,
        address,
        borrowerEmail,
        coboFname,
        coboLname,
        coboAddress,
        coboState,
        coboEmail,
        salesRepEmail,
        bucket,
        key
      );
      console.log(jsonData);
      done();
    }, 30000);
  });
  // CoBorrower Test suite
  describe.only('DocuSign Test Suite for CoBo', () => {
    let baseTest;

    beforeEach(async () => {
      baseTest = await new BaseTest('chrome');
    },300000);


    afterEach(async () => {
      await baseTest.close();
    });

    // Note: SunRun loans must have 'source' value. Look at dynamodb>dev-client-config>loanOptionsMap for values. e,g "Costco"
    test('Create Loan for Co Bo', async done => {
      const parsedData = await parseCSV(csvFileCoBo);
      // parsedData.forEach(async row => {
        const {
          productType,
          loanType,
          language,
          state,
          client,
          borrowerFname,
          borrowerLname,
          address,
          borrowerEmail,
          coboFname,
          coboLname,
          coboAddress,
          coboState,
          coboEmail,
          salesRepEmail,
          bucket,
          key
        } = parsedData[0];
        const jsonData = new CoBorrowerJSON().updateJson(
          productType,
          language,
          state,
          client,
          borrowerFname,
          borrowerLname,
          address,
          borrowerEmail,
          coboFname,
          coboLname,
          coboAddress,
          coboState,
          coboEmail,
          salesRepEmail,
          bucket,
          key
        );
        // return console.log(JSON.stringify(jsonData))
        const loan = new LoanAPI(jsonData);
        console.log(loan);
        const loanStatus = await loan.getLoanStatus();
        expect(loanStatus).toBe('Approved');
        const loanId = await loan.getLoanId();

        const emailPage = await new EmailPage(baseTest.webDriver);
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
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
        // Envelope Download
        console.log('Envelope Download');
        const loanData = new LoanData(loanId);
        const envelopeId = await loanData.getEnvelopeId();
        console.log(envelopeId);
        const filename = `${folderTestFiles + loanType}.pdf`;
        const docuSignAPI = new DocuSignAPI(envelopeId);
        const download = await docuSignAPI.downloadDocument(filename);
        // compare with golden template
        expect(download).toBeTruthy();
        // Number of Pages comparison pdfs
        console.log('Number of Pages comparison pdfs');
        const numberofPagesTestFile = await new ParsePDF(filename).getNumberOfPages();
        const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages();
        expect(numberofPagesTestFile).toBe(numberofPagesExpected);
        // PDF text comparison
        console.log('PDF text comparison');
        const compareLoans = await new CompareLoanDocs(filename, expectedFile);
        const result = await compareLoans.compare();
        expect(result).toEqual([]);
        done();
      // });
    }, 300000);
  });

  // Single borrower test suite
  describe('DocuSign Test Suite', () => {
    each(singleBorrData).test.skip(
      'Create Loan',
      async ({ loanType, productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
        const jsonData = new SingleBorrowerJSON().updateJson(
          productType,
          clientId,
          firstName,
          lastName,
          street,
          state,
          email,
          spokenLanguage,
          source,
          salesRepEmail
        );
        const loan = new LoanAPI(jsonData);
        const loanStatus = await loan.getLoanStatus();
        expect(loanStatus).toBe('Approved');
        const loanId = await loan.getLoanId();
        console.log(loanId);

        const emailPage = await new EmailPage(baseTest.webDriver);
        const docuSignPage = await new DocuSignPage(baseTest.webDriver);
        //   await emailPage.sleep(10000);
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

        // Envelope Download
        console.log('Envelope Download');
        const loanData = new LoanData(loanId);
        const envelopeId = await loanData.getEnvelopeId();
        console.log(envelopeId);
        const filename = `${folderTestFiles + loanType}.pdf`;
        const docuSignAPI = new DocuSignAPI(envelopeId);
        const download = await docuSignAPI.downloadDocument(filename);
        // compare with golden template
        expect(download).toBeTruthy();
        // Number of Pages comparison pdfs
        console.log('Number of Pages comparison pdfs');
        const numberofPagesTestFile = await new ParsePDF(filename).getNumberOfPages();
        const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages();
        expect(numberofPagesTestFile).toBe(numberofPagesExpected);
        // PDF text comparison
        console.log('PDF text comparison');
        const compareLoans = await new CompareLoanDocs(filename, expectedFile);
        const result = await compareLoans.compare();
        expect(result).toEqual([]);
        done();
      },
      300000
    );

    each([['singleBorrSunRun', '19-09-000980']]).test.skip(
      'Download DocuSign Documents',
      async (loanType, loanId, done) => {
        const loanData = new LoanData(loanId);
        const envelopeId = await loanData.getEnvelopeId();
        console.log(envelopeId);
        // download docusign
        const filename = `${folderTestFiles + loanType}.pdf`;
        const docuSignAPI = new DocuSignAPI(envelopeId);
        const download = await docuSignAPI.downloadDocument(filename);
        // compare with golden template
        expect(download).toBeTruthy();
        done();
      },
      5000
    );

    each([['./data/loanDocs/downloads/ESSolar-SB-CA-EN.pdf', './data/loanDocs/docuSignTemplates/singleBorrSunRunTemplate.pdf']]).test.skip(
      'Number of Pages comparison pdfs',
      async (fileToTest, expectedFile, done) => {
        const numberofPagesTestFile = await new ParsePDF(fileToTest).getNumberOfPages();
        const numberofPagesExpected = await new ParsePDF(expectedFile).getNumberOfPages();
        expect(numberofPagesTestFile).toBe(numberofPagesExpected);
        done();
      },
      5000
    );

    each([['./data/loanDocs/downloads/ESSolar-SB-CA-EN.pdf', './data/loanDocs/docuSignTemplates/singleBorrSunRunTemplate.pdf']]).test.skip(
      'PDF text comparison',
      async (fileToTest, expectedFile, done) => {
        const compareLoans = await new CompareLoanDocs(fileToTest, expectedFile);
        const result = await compareLoans.compare();
        expect(result).toEqual([]);
        done();
      },
      5000
    );

    test('testing csv data for CO BO', async done => {
      const parsedData = await parseCSV(csvFileCoBo);
      console.log('parsedData', parsedData);
      done();
    }, 5000);
  }, 300000);
});
