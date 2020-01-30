import BasePageObject from '../../../base/basePageObject';

const { By } = require('selenium-webdriver');

export default class DocuSignPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.securityNewLink = By.xpath('//span[contains(text(),"For Your Security")]');
    this.closeDocs = By.xpath('//button[contains(text(), "Close")]');
    this.otherActions = By.xpath('//span[contains(text(), "Other Actions")]');
    this.docTarget = By.xpath('//span[contains(text(), "Please Review & Act on These Documents")]');
    this.agreeNoShow = By.xpath('//label[contains(text(), "I agree")]/../../../../..//div[@id="action-bar-consent-control" and contains(@style, "none")]');
    this.agreeBox = By.xpath('//span[@class="screen-reader-text"]');
    this.docuSignContinue = By.xpath('//button[contains(text(), "Continue")]');
    this.docuSignStart = By.xpath('//*[contains(text(), "Start")]/../../button[@id="navigate-btn"]');
    this.initialSign = By.xpath('//span[contains(text(),"Initial Here") or contains(text(),"Sign Here")]/../../button'); // elements
    this.docuSignAdopt = By.xpath('//button[contains(text(), "Adopt and Initial")]');
    this.bankElements = By.xpath('//input[@type="text"]');
    this.bankName = By.xpath('//div[contains(@data-label, "bankName")]//input');
    this.routingNumber = By.xpath('//div[contains(@data-label, "routingNumber")]//input');
    this.accountNumber = By.xpath('//div[contains(@data-label, "accountNumber")]//input');
    this.finishBtn = By.xpath('//button[text() = "Finish"]');
    this.docCompleteTarget = By.xpath('//h1[contains(text(), "Save a Copy of Your Document")]');
  }

  async goToDocuSign(link) {
    await this.openUrl(link);
  }

  async signLoanDocs(docuSignLink) {
    await this.fullScreen();
    await this.goToDocuSign(docuSignLink);
    await this.completeDocs();
    await this.closeTabs();
  }

  async completeDocs() {
    // Switch browser tabs
    const handles = await this.getAllWindowHandles();
    if (handles.length > 1) await this.switchWindow(handles, 1);
    await this.waitForTarget(this.otherActions);

    // Check if doc is already signed
    const isSigned = await this.findElements(this.closeDocs);
    if (isSigned.length > 0) {
      console.log('Docs are already signed');
      return;
    }

    // Validate if agree checkbox exists
    const agreeNoShow = await this.findElements(this.agreeNoShow);
    if (agreeNoShow.length === 0) {
      console.log('Agree checkbox exists');
      const agreeBox = await this.findElements(this.agreeBox);
      await agreeBox[0].click();
      console.log('Agree checkbox clicked');
    }
    await this.sleep(1000);

    // Click through begin steps
    const docuSignContinue = await this.waitForElementLocated(this.docuSignContinue, 5000);
    await docuSignContinue.click();
    console.log('Continue Click');
    await this.sleep(1000);
    const docuSignStart = await this.waitForElementLocated(this.docuSignStart, 5000);
    await docuSignStart.click();
    console.log('Start Click');
    await this.sleep(1000);

    // Click through all required signature boxes
    const requiredSigns = await this.waitForElementsLocated(this.initialSign, 5000);
    let count = 0;
    for (const elem of requiredSigns) {
      count++;
      await this.sleep(500);
      const docuSignAdopt = await this.findElements(this.docuSignAdopt);
      if (docuSignAdopt.length > 0) {
        await docuSignAdopt[0].click();
        console.log('Adopt and Initial Click');
        await this.sleep(5000);
      }
      await elem.click();
      console.log(`Click sign: ${count}/${requiredSigns.length}`);
      if (count === 1) await this.waitForTarget(this.docuSignAdopt);
    }
    await this.sleep(1000);

    // Enter Bank info
    const bankName = await this.waitForElementLocated(this.bankName, 5000);
    await this.enterText(bankName, 'Chase');
    const routingNumber = await this.waitForElementLocated(this.routingNumber, 5000);
    await this.enterText(routingNumber, '322271627');
    const accountNumber = await this.waitForElementLocated(this.accountNumber, 5000);
    await this.enterText(accountNumber, '234567890');

    // Finish doc signing
    const finishBtn = await this.waitForElementLocated(this.finishBtn, 5000);
    await finishBtn.click();
    console.log('Finish click');
    await this.waitForTarget(this.docCompleteTarget);
  }
}
