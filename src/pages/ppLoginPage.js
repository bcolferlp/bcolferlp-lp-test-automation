import LoginPage from './loginPage';
import PPLoansPage from './ppLoansPage';

const { urls } = require('../utilities/imports');

export default class PPLoginPage extends LoginPage {
  constructor(webDriver) {
    super(webDriver, `${urls.partnerPortal}/login`);
  }

  async landLoanPage() {
    const ppLoansPage = await new PPLoansPage(this.webDriver);
    return ppLoansPage;
  }
}
