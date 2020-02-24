import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class UWLoanDetailsPage extends BasePageObject {
  constructor(webDriver, loanId) {
    super(webDriver);
    this.url = urls.underwriterPortal;
    this.loanId = loanId;
    // Xpath
    this.span = {
      loanStatus: value => By.xpath(`//span[contains(text(), "${value}")]`)
    };
    this.button = {
      approveLoan: By.xpath('//button[@id="approve-loan-button"]'),
      declineLoan: By.xpath('//button[@id="decline-loan-button"]'),
      cancelLoan: By.xpath('//button[@id="cancel-loan-button"]'),
      resendEmails: By.xpath('//button[@id="resend-emails-button"]'),
      closeLoan: By.xpath('//button[@id="close-loan-button"]')
    };
    this.div = {
      stipulationsList: value => By.xpath(`//div[contains(text(),"${value}")]`)
    };
  }

  async openURL() {
    await this.sleep(2000);
    await this.openUrl(`${this.url}/loan-details?id=${this.loanId}`);
  }

  async validateLoanStatus(status) {
    console.log('validateLoanStatus:', status);
    const loanStatus = await this.waitForElementLocated(this.span.loanStatus(status), 5000);
    return loanStatus;
  }

  async validateApproveLoanButton(status) {
    console.log('validateApproveLoanButton:', status);
    const approvedLoanBtn = await this.waitForElementLocated(this.button.approveLoan, 5000);
    const buttonStatus = await approvedLoanBtn.getAttribute(status);
    return buttonStatus;
  }

  async validateListedStips(stip) {
    console.log('validateListedStips:', stip);
    const stipElements = await this.waitForElementsLocated(this.div.stipulationsList(stip), 5000);
    return stipElements;
  }
}
