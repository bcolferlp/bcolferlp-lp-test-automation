import each from 'jest-each'
const fs = require('fs')
const { path } = require('../src/utilities/imports');
const TestNumber = require('../src/utilities/testNumber')
import LoanAPI from '../src/apis/loanAPI';
const folderResults = path.join(__dirname, '../data/loanDocs/testResults/');
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON';
import CoBorrowerJSON from '../src/utilities/coBorrowerJSON';
import { longStackTraces } from 'bluebird';
const singleBorrSunRunData = require('../data/loanDocs/testData/singleBorrowerSunRunData');
const singleBorrNonSunRunData = require('../data/loanDocs/testData/singleBorrowerNonSunRunData');
//const coBorrSunRunData = require('../data/loanDocs/testData/coBorrowerSunRunData');
const coBorrSunRunData = require('../data/loanDocs/testData/joseTestData/coBorrowerSunRunDataJose');
const coBorrNonSunRunData = require('../data/loanDocs/testData/coBorrowerNonSunRunData');


describe('Create Loans', () => {
    // testNumber format yyyymmddhhmmss
    const testNumber = new TestNumber().getTestNumber()
    // Create folder <testnumber> in results directory
    fs.mkdirSync(`${folderResults}${testNumber}`)
    // write testNumber on file latestTestNumber.txt in results folder
    fs.writeFileSync(`${folderResults}latestTestNumber.txt`, testNumber)
    // create file loanids
    let loanSingleBorrSunRun = []
    let loanSingleBorrNoSunRun = []
    let loanCoBorrSunRun = []
    let loanCoBorrNonSunRun = []

    each(singleBorrSunRunData).test.skip('Create Single Borrower SunRun Loans', async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
        const jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, testNumber);
        //create Loan
        const loan = new LoanAPI(jsonData);
        const loanStatus = await loan.getLoanStatus();
        expect(loanStatus).toBe('Approved');
        const loanId = await loan.getLoanId();
        const temp = new Array(loanId, firstName)
        loanSingleBorrSunRun.push(JSON.stringify(temp))
        //loanSingleBorrSunRun.push(JSON.stringify({ 'loanId': loanId, 'firstName': firstName }));
        fs.writeFileSync(`${folderResults}${testNumber}/loanSingleBorrSunRun.txt`, loanSingleBorrSunRun);
        done();
    }, 10000)

    each(singleBorrNonSunRunData).test.skip('Create Single Borrower Non SunRun Loans', async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
        const jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, testNumber);
        //create Loan
        const loan = new LoanAPI(jsonData);
        const loanStatus = await loan.getLoanStatus();
        expect(loanStatus).toBe('Approved');
        const loanId = await loan.getLoanId();
        const temp = new Array(loanId, firstName)
        loanSingleBorrNoSunRun.push(JSON.stringify(temp))
        //loanSingleBorrNoSunRun.push(JSON.stringify({ 'loanId': loanId, 'firstName': firstName }));
        fs.writeFileSync(`${folderResults}${testNumber}/loanSingleBorrNonSunRun.txt`, loanSingleBorrNoSunRun);
        done();
    }, 10000)


    each(coBorrSunRunData).test('create Combined SunRun Loans', async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, coFirstName, coLastName, coStreet, coState, coEmail }, done) => {
        const jsonData = new CoBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, coFirstName, coLastName, coStreet, coState, coEmail, testNumber);
        //create Loan
        const loan = new LoanAPI(jsonData);
        const loanStatus = await loan.getLoanStatus();
        expect(loanStatus).toBe('Approved');
        const loanId = await loan.getLoanId();
        const temp = new Array(loanId, firstName)
        loanCoBorrSunRun.push(JSON.stringify(temp))
        //loanCoBorrSunRun.push(JSON.stringify({ 'loanId': loanId, 'firstName': firstName }));
        fs.writeFileSync(`${folderResults}${testNumber}/loanCoBorrSunRun.txt`, loanCoBorrSunRun);
        done()
    }, 10000)


    each(coBorrNonSunRunData).test.skip('create Combined Non SunRun Loans', async ({ productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, coFirstName, coLastName, coStreet, coState, coEmail }, done) => {
        const jsonData = new CoBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, coFirstName, coLastName, coStreet, coState, coEmail, testNumber);
        //create Loan
        const loan = new LoanAPI(jsonData);
        const loanStatus = await loan.getLoanStatus();
        expect(loanStatus).toBe('Approved');
        const loanId = await loan.getLoanId();
        const temp = new Array(loanId, firstName)
        loanCoBorrNonSunRun.push(JSON.stringify(temp))
        //loanCoBorrNonSunRun.push(JSON.stringify({ 'loanId': loanId, 'firstName': firstName }));
        fs.writeFileSync(`${folderResults}${testNumber}/loanCoBorrNonSunRun.txt`, loanCoBorrNonSunRun);
        done()
    }, 10000)

})