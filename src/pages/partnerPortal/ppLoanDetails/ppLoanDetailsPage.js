import BasePageObject from '../../../base/basePageObject';

const { By, urls } = require('../../../utilities/imports');

export default class PPLoanDetailsPage extends BasePageObject {
  constructor(webDriver, loanId) {
    super(webDriver);
    this.url = urls.partnerPortal;
    this.loanId = loanId;
    // XPath
    this.text = {
      applicationStatus: value => By.xpath(`//h6[contains(text(),"Application Status")]//following-sibling::span[contains(text(), "${value}")]`)
    };
    this.timeline = {
      icon: {
        approvedGreen: By.xpath('//div[@id="two"][contains(@class, "success")]')
      }
    };
  }

  async goToPage() {
    console.log(`URL: ${this.url}`);
    await this.sleep(2000);
    await this.openUrl(`${this.url}/loans/${this.loanId}`);
  }

  async validateAppStatus(status) {
    console.log('validateAppStatus:', status);
    const appStatus = await this.waitForElementLocated(this.text.applicationStatus(status), 5000);
    return appStatus;
  }

  async validateTimelineApproval() {
    console.log('validateTimelineApproval');
    const timelineApproved = await this.waitForElementLocated(this.timeline.icon.approvedGreen, 5000);
    return timelineApproved;
  }
}
