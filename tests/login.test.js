import BaseTest from '../src/base/baseTest'
import PPLoginPage from '../src/pages/ppLoginPage'
import each from 'jest-each'

each([
    ['chrome'],
    ['firefox']
])
.describe('Login Test', (browser) => {
    let baseTest

    beforeEach(async () => {
        baseTest = await new BaseTest(browser)
    })

    afterEach(async () => {
        await baseTest.quit()
    })

    test('Positive login test', async (done) => {
        const ppLoginPage = await new PPLoginPage(baseTest.webDriver)
        await ppLoginPage.open()
        await ppLoginPage.loginClick()
        const ppLoansPage = await ppLoginPage.landLoanPage()
        await ppLoansPage.waitForLoansPage(5000)
        await expect(await ppLoansPage.isExportButtonVisible()).toBeTruthy()
        done()
    },30000)
    
    each([
        ['bad_username@loanpal.com','Abcd1234!','The Username or Password are invalid. Please try again!'],
        ['test_manager@loanpal.com','bad_password','The Username or Password are invalid. Please try again!']
        ])
        .test('Negative login test', async (username, password, errorMessage, done) => {
        const ppLoginPage = await new PPLoginPage(baseTest.webDriver)
        await ppLoginPage.open()
        await ppLoginPage.loginClick(username,password)
        await ppLoginPage.waitForErrorMessageToShow()
        const message = await ppLoginPage.getErrorMessageText()
        expect(message).toBe(errorMessage)
        done()
    }, 30000)

})
