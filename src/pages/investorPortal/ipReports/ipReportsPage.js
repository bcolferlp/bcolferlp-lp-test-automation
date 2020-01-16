import BasePageObject from '../../../base/basePageObject';

const { By, urls, logUpdate } = require('../../../utilities/imports');

export default class ReportsPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.prepay = `${urls.investorPortal}/reports/prepaySpeeds`;
    // XPath
    this.downloadBtn = By.xpath('//button[contains(text(), "Download")]');
    this.dot = By.xpath('//*[@class="dot"]/*');
    this.provider = By.xpath('//select[@class="dc-select-menu"]');
    this.providerOption = By.xpath('//option[@class="dc-select-option"]');
    this.prePayTableHeaders = By.xpath('//section[@data-qa= "summary-table"]//thead//td');
    this.prePayTable = i => By.xpath(`//section[@data-qa="summary-table"]//tbody//td[${i}]`); // multiple
  }

  async goToPrePayPage() {
    // Navigate to profile settings page
    await this.sleep(2000);
    await this.openUrl(this.prepay);
    await this.waitForTarget(this.downloadBtn);
  }

  async gatherProviders() {
    console.log(`Gathering providers`);
    const providers = await this.waitForElementsLocated(this.providerOption, 10000);
    return providers;
  }

  async verifyGraph(providers, headerText) {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    console.log('Verifying graph');
    const expectResult = [];
    let providerCount = 0;
    const headersElements = await this.waitForElementsLocated(this.prePayTableHeaders, 5000);
    const position = await this.getColumnPosition(headersElements, headerText);
    if (providers && position) {
      // Iterate through provider elements

      for (const row of providers) {
        providerCount += 1;
        const storedValue = await row.getAttribute('value');

        if (providerCount === 1) {
          // Click the first row in  the provider list
          await row.click();
          logUpdate('First Provider:', storedValue);
        } else {
          // Double Click through the rest of the providers
          await this.webDriver
            .actions({ bridge: true })
            .doubleClick(row)
            .perform();
          logUpdate('Next Provider:', storedValue);
        }

        await this.sleep(1000);
        const dots = await this.waitForElementsLocated(this.dot, 10000);
        const columnValue = await this.waitForElementsLocated(this.prePayTable(position), 10000);

        let count = -1;
        if (dots.length > 0 && columnValue.length > 0) {
          // Iterate through points on the graph
          for (const point of dots) {
            count += 1;
            const title = await point.getAttribute('textContent');
            const dotText = title.split(' ')[1];
            const rateValue = await columnValue[count].getAttribute('textContent');
            let rateText = rateValue.replace('%', '');
            if (rateText === '0.00') rateText = '0';
            expectResult.push({ name: storedValue, graphValue: dotText, tableValue: rateText, result: dotText === rateText });
          }
        }
      }
    }
    return expectResult;
  }
}
