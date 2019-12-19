import BasePageObject from '../base/basePageObject';

const { By } = require('../utilities/imports');

export default class RequestLoanDocsPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.requestTarget = By.xpath('//h2[contains(text(), "Almost there!")]');
    this.requestedTarget = By.xpath('//h2[contains(text(), "Thank you!")]');
    this.requestDocsBtn = By.xpath('//button[contains(text(), "Request Loan Documents")]');
    this.solarDecisionEmail = By.xpath('(//span[contains(text(),"Solar Financing Decision")])[1]');
    this.getYourLoanBtn = By.xpath('//a[contains(text(), "Get your Loan")]');
  }

  async goToLink(link) {
    await this.openUrl(link);
  }

  async requestDocuments(link) {
    await this.fullScreen();
    await this.goToLink(link);
    await this.requestClick();
  }

  async requestClick() {
    const handles = await this.getAllWindowHandles();
    if (handles.length > 1) await this.switchWindow(handles, 1);
    await this.waitForTarget(this.requestTarget);
    const requestDocsBtn = await this.waitForElementLocated(this.requestDocsBtn);
    await requestDocsBtn.click();
    await this.waitForTarget(this.requestedTarget);
  }

  async getSolarDecisionEmail() {
    // locates latest docusign email
    const solarDecisionEmail = await this.waitForElementLocated(this.solarDecisionEmail, 10000);
    await solarDecisionEmail.click();
    await this.sleep(1000);
    // Redirect to Docusign
    const getYourLoanBtn = await this.waitForElementLocated(this.getYourLoanBtn, 10000);
    await getYourLoanBtn.click();
    console.log('Request Clicked');
  }
}
