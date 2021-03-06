import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class UWLoanDetailsPage extends BasePageObject {
  constructor(webDriver, loanId) {
    super(webDriver);
    this.url = urls.underwriterPortal;
    this.loanId = loanId;
    // Xpath
    this.span = {
      loanStatus: value => By.xpath(`//span[contains(text(), "${value}")]`),
      stipList: value => By.xpath(`//span//div[contains(text(), "${value}")]`)
    };
    this.button = {
      approveLoan: By.xpath('//button[@id="approve-loan-button"]'),
      declineLoan: By.xpath('//button[@id="decline-loan-button"]'),
      cancelLoan: By.xpath('//button[@id="cancel-loan-button"]'),
      resendEmails: By.xpath('//button[@id="resend-emails-button"]'),
      closeLoan: By.xpath('//button[@id="close-loan-button"]'),
      fullReport: By.xpath('//div[@class="checkmark-circle"]/../../button[text()="Full Report"]'),
      titleInternalStipList: By.xpath('//div[@id="titleInternal"]//label[contains(text(), "Stipulations List")]/..//button')
    };
    this.div = {
      stipulationsList: value => By.xpath(`//div[contains(text(),"${value}")]`)
    };
    this.text = {
      foreclosure: By.xpath('//p[contains(text(),"FOREC")]')
    };
    this.tab = {
      credit: By.xpath('//a[@aria-controls="crefitinfo"]'),
      titleInternal: By.xpath('//a[@aria-controls="title internal"]')
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
    const approvedLoanBtn =
      status === 'disabled'
        ? await this.waitForElementDisabled(this.button.approveLoan, 5000)
        : await this.waitForElementEnabled(this.button.approveLoan, 5000);
    return approvedLoanBtn;
  }

  async validateListedStips(stip) {
    console.log('validateListedStips:', stip);
    const stipElements = await this.waitForElementsLocated(this.div.stipulationsList(stip), 5000);
    return stipElements;
  }

  async viewFullReport() {
    console.log('viewFullReport');
    const creditTab = await this.waitForElementLocated(this.tab.credit, 5000);
    await creditTab.click();
    const fullReportBtn = await this.waitForElementLocated(this.button.fullReport, 5000);
    await fullReportBtn.click();
  }

  async validateReportForeclosure() {
    console.log('validateReportForeclosure');
    await this.waitForElementLocated(this.text.foreclosure, 5000);
  }

  async viewStipTab(stipType) {
    console.log('viewStipTab', stipType);
    const stipTab = await this.waitForElementLocated(this.tab[stipType], 5000);
    await stipTab.click();
    await this.sleep(500);
  }

  async viewTitleInternalStipsList() {
    console.log('viewTitleInternalStipsList');
    const stipBtn = await this.waitForElementLocated(this.button.titleInternalStipList, 5000);
    await stipBtn.click();
    await this.sleep(500);
  }

  async validateTitleInternalStipList(stip) {
    console.log('validateTitleInternalStipList', stip);
    const stipElement = await this.waitForElementLocated(this.span.stipList(stip), 5000);
    return stipElement;
  }
}
