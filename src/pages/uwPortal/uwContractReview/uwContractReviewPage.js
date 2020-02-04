import BasePageObject from '../../../base/basePageObject';
import Aurora from '../../../utilities/aurora';
import LoanData from '../../../utilities/loanData';

const { By, Key, urls } = require('../../../utilities/imports');

export default class UWContractReviewPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.url = urls.underwriterPortal;
    // Xpath
    this.passBtn = text => By.xpath(`//label[contains(text(),"${text}")]/..//button`);
    this.passInput = text => By.xpath(`//label[contains(text(), "${text}")]/..//input`);
    this.effectiveDate = By.xpath('//label[contains(text(), "HIC Effective Date")]//following-sibling::input');
    this.completeReview = By.xpath('//button[contains(text(), "Complete Contract Review")]');
    this.submitReview = By.xpath('//a[contains(text(), "Submit Review")]');
  }

  async loanContractReview(loanId) {
    await this.sleep(2000);
    await this.openUrl(`${this.url}/contract-review?id=${loanId}`);
    console.log('On the Contract Review page');
  }

  async completeContractReview() {
    const validHICPass = await this.waitForElementLocated(this.passBtn('Valid HIC'), 5000);
    await validHICPass.click();
    const loanAmountPass = await this.waitForElementLocated(this.passBtn('Loan Amount'), 5000);
    await loanAmountPass.click();
    const installerNamePass = await this.waitForElementLocated(this.passBtn('Installer Name'), 5000);
    await installerNamePass.click();
    const addOnPass = await this.waitForElementLocated(this.passBtn('Add-On Expenses Listed on HIC'), 5000);
    await addOnPass.click();
    const borrowerNamePass = await this.waitForElementLocated(this.passBtn('Borrower Name'), 5000);
    await borrowerNamePass.click();
    const loanTermPass = await this.waitForElementLocated(this.passBtn('Loan term/rate listed on HIC'), 5000);
    await loanTermPass.click();
    const streetPass = await this.waitForElementLocated(this.passBtn('Street'), 5000);
    await streetPass.click();
    const installerStatePass = await this.waitForElementLocated(this.passBtn('State License Present on HIC'), 5000);
    await installerStatePass.click();
    const cityPass = await this.waitForElementLocated(this.passBtn('City'), 5000);
    await cityPass.click();
    const workmanshipWarrantyPass = await this.waitForElementLocated(this.passInput('Workmanship Warranty Term Present on HIC'), 5000);
    await this.enterText(workmanshipWarrantyPass, 5);
    const roofWarrantyPass = await this.waitForElementLocated(this.passInput('Workmanship Warranty Term Present on HIC'), 5000);
    await this.enterText(roofWarrantyPass, 5);
    const statePass = await this.waitForElementLocated(this.passBtn('State'), 5000);
    await statePass.click();
    const zipPass = await this.waitForElementLocated(this.passBtn('Zip'), 5000);
    await zipPass.click();
    const financePartyPass = await this.waitForElementLocated(this.passBtn('Please confirm that no other Finance Party is Present on HIC'), 5000);
    await financePartyPass.click();
    const effectiveDatePass = await this.waitForElementLocated(this.effectiveDate, 5000);
    await effectiveDatePass.click();
    await this.sleep(1000);
    const body = await this.waitForElementLocated('body', 5000);
    await body.sendKeys(Key.ENTER);
    await this.sleep(1000);
    const customerRightPass = await this.waitForElementLocated(this.passBtn('Customer Right to Cancel Present on HIC'), 5000);
    await customerRightPass.click();
    const borrowerSignPass = await this.waitForElementLocated(this.passBtn('Borrower Signature Present on HIC'), 5000);
    await borrowerSignPass.click();
    const hicModifyPass = await this.waitForElementLocated(this.passBtn('The HIC has not been visibly modified after the customer signed'), 5000);
    await hicModifyPass.click();
    const installerSignPass = await this.waitForElementLocated(this.passBtn('Installer Signature Present on HIC'), 5000);
    await installerSignPass.click();
    const changeOrderPass = await this.waitForElementLocated(this.passBtn('If there is a Change Order, have both parties signed the Change Order'), 5000);
    await changeOrderPass.click();
    const disclosurePass = await this.waitForElementLocated(this.passBtn('Is CA Solar Disclosure One-Pager Present on HIC'), 5000);
    await disclosurePass.click();
    const completeContractReview = await this.waitForElementLocated(this.completeReview, 5000);
    await completeContractReview.click();
    await this.sleep(2000);
    const submitReviewBtn = await this.waitForElementLocated(this.submitReview, 5000);
    await submitReviewBtn.click();
    console.log('Review Submitted');
    await this.sleep(10000);
  }

  async verifyDynamo(loanId) {
    const loanData = new LoanData(loanId);
    const dynaContract = await loanData.getContractReview();
    console.log('Got Dynamo Contract Review record');
    return dynaContract;
  }

  async verifyAurora(loanId) {
    const sqlQuery = `SELECT * FROM ${process.env.STAGE}.cf_contract_review where loanid='${loanId}'`;
    const aurora = new Aurora(sqlQuery);
    const auroraContract = await aurora.getPayload();
    console.log('Got Aurora Contract Review record:');
    return auroraContract;
  }

  async verifyRecords(dynamo, aurora) {
    const { loanId: dLoan = '', timestamp = '' } = dynamo[0];
    const { loanid: aLoan = '', createddt = '' } = aurora[0];
    const dynamoDate = new Date(timestamp);
    const auroraDate = new Date(createddt);

    return {
      dLoan,
      aLoan,
      dynamoDate,
      auroraDate
    };
  }
}
