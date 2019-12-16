import each from 'jest-each'
const fs = require('fs')
const TestNumber = require('../src/testNumber')
const loanidsArray = ['loan1']
//const singleBorrData = require('../data/loanDocs/testData/singleBorrowerDataJose');
//const coBorrData = require('../data/loanDocs/testData/coBorrowerData');
const singleBorrData = ['sb1']
const coBorrData = ['cb1']

describe('loan test', () => {

    describe('create loan', () => {
        // get testnumber (concatenation of yyyymmddhhmmss)
        // Create folder <testnumber> in results directory
        // update testconfig with <testnumber> as latest test
        // create file loanids
        const testNumber  = new TestNumber().getTestNumber()
        fs.mkdirSync(`./data/results/${testNumber}`)
        console.log('writing latest tn in file')
        fs.writeFileSync('./latestTestNumber.txt', testNumber)
        // create loansid file (js obj, txt ??)


        each(singleBorrData)
        .test.skip('create SingleBorrower loan', (element) => { 
            // for each loan created, append loansid file
            console.log(element)
        })

        each(coBorrData)
        .test.skip('create Combined loan', (element) => { 
            // for each loan created, append loansid file
            console.log(element)
        })

    })

    describe.skip('assert enail received, get link, sign docs', () => {
        // get latest test from testconfig
        let testNumber = fs.readFileSync('./latestTestNumber.txt')
        //console.log('testNumber is ',testNumber.toString())

        // go to folder, open loanids file, pass array
        each(loanidsArray)
        .test('email verification and sign docs', (element) => { 
            // for each loan created, append loansid file
            console.log(element)
        })
    })

    describe.skip('get envelopeId and download docs', () => {
        // get latest test from testconfig
        // go to folder, open loanids file, pass array
        each(loanidsArray)
        .test('email verification and sign docs', (element) => { 
            // for each loan created, append loansid file
            console.log(element)
        })
    })


    describe.skip('compare documents', () => {
        // get latest test from testconfig
        // go to folder, open loanids file, pass array
        each(loanidsArray)
        .test('email verification and sign docs', (element) => { 
            // for each loan created, append loansid file
            console.log(element)
        })
    })

})