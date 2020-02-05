import BasePageObject from '../../../base/basePageObject';

const { By, Key, urls } = require('../../../utilities/imports');

export default class UWContractReviewPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.url = urls.underwriterPortal;
    // Xpath
    this.thumbBtn = (label, title) => By.xpath(`//label[contains(text(),"${label}")]/..//button[contains(@title,"${title}")]`);
    this.answerBtn = (text, answer) => By.xpath(`//label[contains(text(),"${text}")]/..//button[contains(text(),"${answer}")]`);
    this.passInput = text => By.xpath(`//label[contains(text(), "${text}")]/..//input`);
    this.effectiveDate = By.xpath('//label[contains(text(), "HIC Effective Date")]//following-sibling::input');
    this.completeReview = By.xpath('//button[contains(text(), "Complete Contract Review")]');
    this.submitReview = By.xpath('//a[contains(text(), "Submit Review")]');
    this.modal = By.xpath('//div[@class="modal fade show"]');
    this.body = By.xpath('//body');
  }

  async loanContractReview(loanId) {
    await this.sleep(2000);
    await this.openUrl(`${this.url}/contract-review?id=${loanId}`);
    console.log('On the Contract Review page for', loanId);
  }

  async completeContractReview() {
    const validHICPass = await this.waitForElementLocated(this.thumbBtn('Valid HIC', 'Pass'), 5000);
    await validHICPass.click();
    const loanAmountPass = await this.waitForElementLocated(this.thumbBtn('Loan Amount', 'Pass'), 5000);
    await loanAmountPass.click();
    const installerNamePass = await this.waitForElementLocated(this.thumbBtn('Installer Name', 'Pass'), 5000);
    await installerNamePass.click();
    const addOnPass = await this.waitForElementLocated(this.thumbBtn('Add-On Expenses Listed on HIC', 'No Add-ons'), 5000);
    await addOnPass.click();
    const borrowerNamePass = await this.waitForElementLocated(this.thumbBtn('Borrower Name', 'Pass'), 5000);
    await borrowerNamePass.click();
    const loanTermPass = await this.waitForElementLocated(this.thumbBtn('Loan term/rate listed on HIC', 'Pass'), 5000);
    await loanTermPass.click();
    const streetPass = await this.waitForElementLocated(this.thumbBtn('Street', 'Pass'), 5000);
    await streetPass.click();
    const installerStatePass = await this.waitForElementLocated(this.answerBtn('State License Present on HIC', 'Pass'), 5000);
    await installerStatePass.click();
    const cityPass = await this.waitForElementLocated(this.thumbBtn('City', 'Pass'), 5000);
    await cityPass.click();
    const workmanshipWarrantyPass = await this.waitForElementLocated(this.passInput('Workmanship Warranty Term Present on HIC'), 5000);
    await this.enterText(workmanshipWarrantyPass, '5');
    const roofWarrantyPass = await this.waitForElementLocated(this.passInput('Roof Penetration Warranty Term Present on HIC'), 5000);
    await this.enterText(roofWarrantyPass, '5');
    const statePass = await this.waitForElementLocated(this.thumbBtn('State', 'Pass'), 5000);
    await statePass.click();
    const zipPass = await this.waitForElementLocated(this.thumbBtn('Zip', 'Pass'), 5000);
    await zipPass.click();
    const financePartyPass = await this.waitForElementLocated(this.thumbBtn('Please confirm that no other Finance Party is Present on HIC', 'Pass'), 5000);
    await financePartyPass.click();
    const effectiveDatePass = await this.waitForElementLocated(this.effectiveDate, 5000);
    await effectiveDatePass.click();
    await this.sleep(1000);
    const body = await this.waitForElementLocated(this.body, 5000);
    await body.sendKeys(Key.ENTER);
    await this.sleep(1000);
    const customerRightPass = await this.waitForElementLocated(this.answerBtn('Customer Right to Cancel Present on HIC', 'Yes'), 5000);
    await customerRightPass.click();
    const borrowerSignPass = await this.waitForElementLocated(this.answerBtn('Borrower Signature Present on HIC', 'Yes'), 5000);
    await borrowerSignPass.click();
    const hicModifyPass = await this.waitForElementLocated(this.answerBtn('The HIC has not been visibly modified after the customer signed', 'Yes'), 5000);
    await hicModifyPass.click();
    const installerSignPass = await this.waitForElementLocated(this.answerBtn('Installer Signature Present on HIC', 'Yes'), 5000);
    await installerSignPass.click();
    const changeOrderPass = await this.waitForElementLocated(
      this.answerBtn('If there is a Change Order, have both parties signed the Change Order', 'Yes'),
      5000
    );
    await changeOrderPass.click();
    const disclosurePass = await this.waitForElementLocated(this.answerBtn('Is CA Solar Disclosure One-Pager Present on HIC', 'Yes'), 5000);
    await disclosurePass.click();
    const completeContractReview = await this.waitForElementLocated(this.completeReview, 5000);
    await completeContractReview.click();
    await this.sleep(2000);
    const submitReviewBtn = await this.waitForElementLocated(this.submitReview, 5000);
    await submitReviewBtn.click();
    console.log('Review Submitted');
    await this.waitForTargetRemoval(this.modal);
  }
}
