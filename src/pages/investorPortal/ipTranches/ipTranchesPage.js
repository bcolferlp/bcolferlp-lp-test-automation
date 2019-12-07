import BasePageObject from '../../../base/basePageObject';

const { By } = require('selenium-webDriver');
const { fs, path, getNewestFile, format } = require('../../../utilities/imports');

export default class IPTranchesPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.url = process.env.investorPortal;
    // Xpath
    this.trancheHeaders = By.xpath('//div[contains(@class, "__qa_div_tranchesTable")]//thead//th');
    this.trancheRows = By.xpath('//div[contains(@class, "__qa_div_tranchesTable")]//tbody/tr');
    this.trancheView = By.xpath('//table/tbody/tr');
    this.dlData = By.xpath('//button[contains(text(), "Download Data")]');
    this.noFile = By.xpath('//div[@role="alertdialog"]');
  }

  async goToDashboard() {
    // Navigate to the investor portal
    await this.openUrl(this.url);
  }

  async getTrancheIds(trancheRows) {
    // Iterate through rows and return array of TrancheId cell text
    const trancheIds = await Promise.all(
      trancheRows.map(async elem => {
        const trancheIdCell = await elem.findElements(By.tagName('td'));
        const trancheIdText = await trancheIdCell[0].getText();
        return trancheIdText;
      })
    );
    return trancheIds;
  }

  async downloadTranche(trancheIds) {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */

    // Reset file count
    let count = 0;
    // Iterate through TrancheIds, download related file and verify naming convention
    const toValidate = [];
    for (const id of trancheIds) {
      await this.openUrl(`${this.url}/tranche-view/${id}`);
      const dlDataBtn = await this.waitForElementLocated(this.dlData, 10000);
      await dlDataBtn.click();
      console.log(`Downloading: ${(count += 1)}/${trancheIds.length}`);
      await this.sleep(5000);
      const file = getNewestFile();
      const fileName = path.basename(file, '.xlsx');

      toValidate.push({ fileName, formattedName: format.dateFormatDot(id) });
      // Delete downloaded file
      try {
        fs.unlinkSync(file);
        console.log(`Removing ${file}`);
      } catch (err) {
        console.error(err);
      }
    }
    return toValidate;
  }

  async downloadTrancheDocs(trancheIds) {
    // Iterate through TrancheIds, download related file
    for (const id of trancheIds) {
      this.openUrl(`${this.url}/tranche-view/${id}`);
      const tranceViewRows = await this.waitForElementsLocated(this.trancheView, 5000);
      const cellRow = await this.cellElement(tranceViewRows, 'svg', false);

      const [hic, doc, report, cert] = cellRow;
      await hic.click();
      await this.sleep(500);
      await this.findElements(this.noFile);
      console.log('hic Click');
      await this.sleep(1000);
      await this.closeTabs();

      await doc.click();
      await this.sleep(500);
      this.findElements(this.noFile);
      console.log('docs Click');
      await this.sleep(1000);
      await this.closeTabs();

      await report.click();
      await this.sleep(500);
      await this.findElements(this.noFile);
      console.log('report Click');
      await this.sleep(1000);
      await this.closeTabs();

      await cert.click();
      await this.sleep(500);
      await this.findElements(this.noFile);
      console.log('cert Click');
      await this.sleep(1000);
      await this.closeTabs();
      /*
      BREAKING LOOP
      DEV is using prod records to list data, but does not include equivalent files to download
      For testing purposes Credigy/tranche-view/2019-02-27/18-16-003915 row is the only available
      */
      break;
    }
  }

  async getTrancheHeaders() {
    const trancheHeaderElements = await this.waitForElementsLocated(this.trancheHeaders, 10000);
    const trancheHeaders = await Promise.all(
      trancheHeaderElements.map(async header => {
        const headerText = await header.getText();
        return headerText;
      })
    );
    return trancheHeaders;
  }

  async getTrancheRows() {
    const trancheRows = await this.waitForElementsLocated(this.trancheRows, 20000);
    return trancheRows;
  }
}
