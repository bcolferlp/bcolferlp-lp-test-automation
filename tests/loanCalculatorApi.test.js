import each from 'jest-each'
import LoanCalcAPI from '../src/apis/loanCalcAPI'


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
