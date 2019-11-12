import LoginPage from './loginPage'
import PPLoansPage from './ppLoansPage'

export default class PPLoginPage extends LoginPage{
    constructor(webDriver){
        super(webDriver, 'https://dev-partner-admin.loanpal.com/login')
    }

    async landLoanPage(){
        const ppLoansPage = await new PPLoansPage(this.webDriver)
        return ppLoansPage
    }

}