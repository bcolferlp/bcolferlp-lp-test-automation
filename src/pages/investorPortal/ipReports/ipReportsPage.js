import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class ReportsPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.prepay = `${urls.investorPortal}/reports/prepaySpeeds`;
    // XPath
    this.dot = By.xpath('//*[@class="dot"]/*');
    this.provider = By.xpath('//select[@class="dc-select-menu"]');
    this.providerOption = By.xpath('//option[@class="dc-select-option"]');
    this.prePayTable = By.xpath('//section[@data-qa="summary-table"]//span[contains(text(), "%")]'); // multiple
  }

  async goToPrePayPage() {
    // Navigate to profile settings page
    await this.sleep(2000);
    await this.openUrl(this.prepay);
  }

  async gatherProviders() {
    const providers = await this.waitForElementsLocated(this.providerOption, 10000);
    console.log(`${providers.length} Gathered`);
    return providers;
  }

  async verifyGraph(providers) {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    const expectResult = [];
    const actions = this.webDriver.actions({ bridge: true });
    let providerCount = 0;

    // Iterate through provider elements
    for (const row of providers) {
      providerCount += 1;
      const storedValue = await row.getAttribute('value');

      if (providerCount === 1) {
        // Click the first row in  the provider list
        await row.click();
      } else {
        // Double Click through the rest of the providers
        await actions.doubleClick(row).perform();
        console.log('Next Provider');
      }

      await this.sleep(1000);
      const dots = await this.waitForElementsLocated(this.dot, 10000);
      const prePayRates = await this.waitForElementsLocated(this.prePayTable, 10000);

      let count = -1;

      // Iterate through points on the graph
      for (const point of dots) {
        count += 1;
        const title = await point.getAttribute('textContent');
        const dotText = title.split(' ')[1];
        const rateValue = await prePayRates[count].getAttribute('textContent');
        let rateText = rateValue.replace('%', '');
        if (rateText === '0.00') rateText = '0';
        expectResult.push({ name: storedValue, result: dotText === rateText });
        // const conCheck = `dotText: ${dotText}, rateText: ${rateText}, expectResult: ${expectResult}`;

        // expect(dotText).to.equal(rateText);
      }
    }
    return expectResult;
  }
}
