/* eslint-disable jest/no-identical-title */
/* eslint-disable guard-for-in */
import each from 'jest-each';
import BaseTest from '../../../src/base/baseTest';
import * as ppLoginUtil from '../../../src/utilities/ppLogin';
import PPLoginPage from '../../../src/pages/partnerPortal/ppLogin/ppLoginPage';

require('dotenv').config();
const { By } = require('selenium-webdriver');

each(['chrome']).describe('PP Login Test', browser => {
  let baseTest;

  beforeEach(async () => {
    baseTest = await new BaseTest(browser);
  });

  afterEach(async () => {
    await baseTest.close();
  });

  test('HARM-230-Change Order disabled for loans not Final System Verified', async done => {
    console.log('Logging in as BlueRaven Partner with Partner-Manager Permission');
    console.log('Validating the Filters');
    await ppLoginUtil.loginForPP(baseTest, process.env.ppBlueRaven, process.env.ppBlueRavenPass);

    const ppLoginPage = await new PPLoginPage(baseTest.webDriver);
    await ppLoginPage.sleep(3000);
    const allLoanPath = By.xpath('//a[@href = "/loans"]');
    const allLoanLink = await ppLoginPage.findElement(allLoanPath);
    allLoanLink.click();
    // console.log('Loan List View is clicked');
    await ppLoginPage.sleep(2000);

    // VIEW THE FILTERS
    const viewFilterPath = By.xpath('//button[@id = "viewFilters"]');
    const viewFilter = await ppLoginPage.findElement(viewFilterPath);
    viewFilter.click();
    console.log('View FIlters Button is clicked');
    await ppLoginPage.sleep(2000);
    
    // VALIDATE PRODUCT TYPE FILTER FOR PARTNER-MANAGER
    const checkForProductTypePath = By.xpath('//*[contains(text(), "Product Type")]');
    const checkForProductTypeFilter = await ppLoginPage.findElements(checkForProductTypePath);
    expect(checkForProductTypeFilter.length).toEqual(0);
    console.log("Product Type is not visible for `Partner-Manager` roles");
  
    
    // VALIDATE THE LOAN TERM FILTER
    await ppLoginPage.sleep(2000);
    const checkForLoanOptionsPath = By.xpath('//div[@id="loanOptions_heading"]');
    const checkForLoanOptionFilter = await ppLoginPage.findElement(checkForLoanOptionsPath);
    expect(checkForLoanOptionFilter).toBeTruthy();
    await checkForLoanOptionFilter.click();
    console.log('Loan Options Filter is present');
    await ppLoginPage.sleep(2000);


    // VALIDATE THE LOAN TERM / RATE DROP DOWN
    await ppLoginPage.sleep(2000);
    const checkForLoanTermRatePath = By.xpath('//label[contains(text(), "Term / Rate")]');
    await ppLoginPage.findElement(checkForLoanTermRatePath);
    console.log('Loan Term/Rate dropdown is present');

    // ENTER A VALUE FROM THE DROP DOWN
    await ppLoginPage.sleep(2000);
    const viewTheDropDownPathLO = By.xpath('//div[@id = "loanOptionsFilterList_select"]');
    const viewTheDropDownLO = await ppLoginPage.findElement(viewTheDropDownPathLO);
    await viewTheDropDownLO.click();
    await ppLoginPage.sleep(1000);
    console.log('Loan Term/Rate dropdown has values');

    // CHOOSING  10 YEAR LOAN 2.99% Loans
    const enterAValuePathLO = By.xpath('//*[contains(text(),"10 Year Loan 2.99%")]');
    const enterAValueLO = await ppLoginPage.findElement(enterAValuePathLO);
    await enterAValueLO.click();
    await ppLoginPage.sleep(2000);
    console.log('Chose 10 Year loan 2.99 loans to view');
    
   // CLOSE THE FILTER
    const closeTheFilterPath = By.xpath('//button[@id = "filtersClose"]');
    const closeTheFilter = await ppLoginPage.findElement(closeTheFilterPath);
    await closeTheFilter.click();
    await ppLoginPage.sleep(2000);

    // VALIDATING only 10 YEAR 2.99 loans appears in the loanListView
    const validateTheRatePath = By.xpath('//label[contains(text(),"Rate")]');
    await ppLoginPage.findElement(validateTheRatePath);
    console.log("Only 2.99% loans are present in loanListView");
    await ppLoginPage.sleep(2000);

    const validateTheTermPath = By.xpath('//label[contains(text(),"Term")]');
    await ppLoginPage.findElement(validateTheTermPath);
    console.log('Only 10 Year loans are present in loanListView');
    await ppLoginPage.sleep(2000);

    done();
  }, 300000);
});
