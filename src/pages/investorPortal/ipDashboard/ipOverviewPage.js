import BasePageObject from '../../../base/basePageObject';
import Aurora from '../../../utilities/aurora';

const { By, format } = require('../../../utilities/imports');

export default class OverviewPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.overviewCards = By.xpath('//div[contains(@class, "__qa_div_statCardComponent")]');
    this.trancheRows = By.xpath('//div[contains(@class, "__qa_div_tranchesTable")]//tbody/tr');
  }

  async goToDashboard() {
    // Navigate to the investor portal
    await this.get(`https://${process.env.STAGE}investors.loanpal.com`);
  }

  async getTrancheRows() {
    const trancheRows = await this.waitForElementsLocated(this.trancheRows, 20000);
    return trancheRows;
  }

  async getOverview() {
    const overviewCards = await this.waitForElementsLocated(this.overviewCards, 5000);
    return overviewCards;
  }

  async verifyOverview(trancheRows, overviewCards, clientId) {
    const query = `select originalloanamount from ${process.env.STAGE}.sale_transaction where partner = "${clientId}";`;
    const aurora = new Aurora(query);
    const auroraResults = await aurora.getPayload();
    let loanAmt = 0;
    auroraResults.forEach(({ originalloanamount: num }) => {
      loanAmt += num;
    });
    const avgLoanAmt = parseInt(loanAmt / auroraResults.length, 10);
    const elementText = await this.eText(overviewCards, 'h2');
    const convertedElemNums = elementText.map(element => {
      const elemNum = format.moneyToNumber(element);
      return elemNum;
    });
    // console.log('convertedElemNums', convertedElemNums);
    const trancheCells = await this.cellText(trancheRows);
    let portfolioTotal = 0;
    let totalLoan = 0;
    let totalFico = 0;
    trancheCells.forEach(cell => {
      const cAmount = format.moneyToNumber(cell[11]);
      portfolioTotal += cAmount;
      totalLoan += +cell[7];
      totalFico += +cell[9];
    });
    const avgFico = Math.round(totalFico / trancheRows.length);
    return {
      convertedElemNums,
      portfolioTotal,
      totalLoan,
      avgLoanAmt,
      avgFico
    };
  }
}
