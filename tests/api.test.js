import each from 'jest-each'
import Loan from '../src/apis/loans'

const jsonData = {
    "applicant": {
        "ssn": "666-64-8856",
        "firstName": "IDA",
        "lastName": "COOPER",
        "dob": "1956-12-09",
        "annualIncome": "$60,000.00",
        "email": "<your.email@domain.com>",
        "phone": "+14654654564",
        "electronicConsent": true,
        "spokenLanguage": "english",
        "address": {
            "street": "152 CLIFTON PL",
            "city": "SYRACUSE",
            "state": "NY",
            "zip": "13206"
        }
    },
    "salesRep": {
        "firstName": "Joe",
        "lastName": "Salesman",
        "email": "<your.email@domain.com>"
    },
    "totalSystemCost": "$25,000.00",
    "batteryIncluded": false,
    "source": "",
    "agent": "",
    "isOwner": true,
    "isOccupant": true,
    "referenceNumber": "Single-Approved",
    "selectedLoanOption": 1
}

describe.skip('Loan Calculator API Test Suite', () => {

each([
    [25000,3.99,10,0.26,{"initialMonthlyPayment":"$192.98","adjustedMonthlyPayment":"$268.23"}]
    ])
    .test('Standard Payment Calculator API', async (loanAmount,rate,term,baseItcPct,expectedPayments,done) => {
        const loanCalc = await new LoanCalcAPI(loanAmount, rate, term, baseItcPct)
        let result = await loanCalc.calcStandardPayment()
        expect(result).toStrictEqual(expectedPayments)
        done()
        }, 5000)

    })

test('Create Loan', async (jsonData) => {
    let result = await new Loan(jsonData).createLoan()
    console.log(result)
})

})
