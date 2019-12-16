import each from 'jest-each'
const fs = require('fs')
const { path } = require('../src/utilities/imports');
const TestNumber = require('../src/utilities/testNumber')
const folderResults = path.join(__dirname, '../data/results/');
import SingleBorrowerJSON from '../src/utilities/singleBorrowerJSON';
const loanidsArray = ['loan1']
const singleBorrData = require('../data/loanDocs/testData/singleBorrowerData');
const coBorrData = require('../data/loanDocs/testData/coBorrowerData');

describe('Create Loans', () => {
    // testNumber format yyyymmddhhmmss
    const testNumber = new TestNumber().getTestNumber()
    // Create folder <testnumber> in results directory
    fs.mkdirSync(`${folderResults}${testNumber}`)
    // write testNumber on file latestTestNumber.txt in results folder
    fs.writeFileSync(`${folderResults}latestTestNumber.txt`, testNumber)
    // create file loanids
    let loanIdSingleBorrSunRun = []
    let loanIdCoBorrSunRun = []
    let loanIdSingleBorrNoSunRun = []
    let loanIdCoBorrNoSunRun = []
    // create loansid file (js obj, txt ??)

    each(singleBorrSunRun)
        .test('Create Single Borrower SunRun Loans',
            async ({ loanType, productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
                const jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail);
                //create Loan
                const loan = new LoanAPI(jsonData);
                const loanStatus = await loan.getLoanStatus();
                expect(loanStatus).toBe('Approved');
                const loanId = await loan.getLoanId();
                loanIdSingleBorrSunRun.push(loanId);
                fs.writeFileSync(`${folderResults}${testNumber}/loanIdSingleBorrSunRun.txt`, loanIdSingleBorrSunRun);
            })

    each(coBorrSunRun)
        .test('create Combined SunRun Loans',
            (element) => {
                const jsonData = new CoBorrowerJSON().updateJson(productType, language, state, client, borrowerFname, borrowerLname, address, borrowerEmail, coboFname,
                    coboLname, coboAddress, coboState, coboEmail, salesRepEmail, bucket, key);
                //create Loan
                const loan = new LoanAPI(jsonData);
                const loanStatus = await loan.getLoanStatus();
                expect(loanStatus).toBe('Approved');
                const loanId = await loan.getLoanId();
                loanIdCoBorrSunRun.push(loanId);
                fs.writeFileSync(`${folderResults}${testNumber}/loanIdCoBorrSunRun.txt`, loanIdCoBorrSunRun);
            })

    each(singleBorrNoSunRun)
        .test('Create Single Borrower No SunRun Loans',
            async ({ loanType, productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail }, done) => {
                const jsonData = new SingleBorrowerJSON().updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail);
                //create Loan
                const loan = new LoanAPI(jsonData);
                const loanStatus = await loan.getLoanStatus();
                expect(loanStatus).toBe('Approved');
                const loanId = await loan.getLoanId();
                loanIdSingleBorrNoSunRun.push(loanId);
                fs.writeFileSync(`${folderResults}${testNumber}/loanIdSingleBorrNoSunRun.txt`, loanIdSingleBorrNoSunRun);
            })

    each(coBorrNoSunRun)
        .test('create Combined SunRun Loans',
            (element) => {
                const jsonData = new CoBorrowerJSON().updateJson(productType, language, state, client, borrowerFname, borrowerLname, address, borrowerEmail, coboFname,
                    coboLname, coboAddress, coboState, coboEmail, salesRepEmail, bucket, key);
                //create Loan
                const loan = new LoanAPI(jsonData);
                const loanStatus = await loan.getLoanStatus();
                expect(loanStatus).toBe('Approved');
                const loanId = await loan.getLoanId();
                loanIdCoBorrNoSunRun.push(loanId);
                fs.writeFileSync(`${folderResults}${testNumber}/loanIdCoBorrNoSunRun.txt`, loanIdCoBorrNoSunRun);
            })

})