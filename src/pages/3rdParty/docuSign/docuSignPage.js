import BasePageObject from '../../../base/basePageObject';

const { By } = require('selenium-webdriver');

export default class DocuSignPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.docTarget = By.xpath('//span[contains(text(), "Please Review & Act on These Documents")]');
    this.agreeNoShow = By.xpath('//label[contains(text(), "I agree")]/../../../../..//div[@id="action-bar-consent-control" and contains(@style, "none")]');
    this.agreeBox = By.xpath('//span[@class="screen-reader-text"]');
    this.docuSignContinue = By.xpath('//button[contains(text(), "Continue")]');
    this.docuSignStart = By.xpath('//*[contains(text(), "Start")]/../../button[@id="navigate-btn"]');
    this.initialSign = By.xpath('//span[contains(text(),"Initial Here") or contains(text(),"Sign Here")]/../../button'); // elements
    this.docuSignAdopt = By.xpath('//button[contains(text(), "Adopt and Initial")]');
    this.bankElements = By.xpath('//input[@type="text"]');
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
    const handles = await this.getAllWindowHandles();
    if (handles.length > 1) await this.switchWindow(handles, 1);
    await this.waitForTarget(this.docTarget);
    const agreeNoShow = await this.findElements(this.agreeNoShow);
    if (agreeNoShow.length === 0) {
      console.log('Agree checkbox exists');
      const agreeBox = await this.findElements(this.agreeBox);
      await agreeBox[0].click();
    }
    const docuSignContinue = await this.waitForElementLocated(this.docuSignContinue, 5000);
    await this.waitForTarget(docuSignContinue)
    await docuSignContinue.click();
    console.log('Continue Click');
    const docuSignStart = await this.waitForElementLocated(this.docuSignStart, 5000);
    await docuSignStart.click();
    console.log('Start Click');
    await this.sleep(1000);

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
      console.log('Click sign');
      if (count === 1) await this.waitForTarget(this.docuSignAdopt);
    }
    const bankElems = await this.waitForElementsLocated(this.bankElements, 5000);
    await bankElems[0].sendKeys('Chase');
    await this.sleep(1000);
    await bankElems[1].sendKeys('322271627'); // CA chase
    await this.sleep(1000);
    await bankElems[2].sendKeys('123456789');
    await this.sleep(1000);

    const finishBtn = await this.waitForElementLocated(this.finishBtn, 5000);
    await finishBtn.click();
    console.log('Finish click');
    await this.waitForTarget(this.docCompleteTarget);
  }
}
