import moment from 'moment';
import BasePageObject from '../../../../base/basePageObject';
import LoanData from '../../../../utilities/loanData';

const { By, urls } = require('../../../../utilities/imports');

export default class UWLoanDetailsTabPage extends BasePageObject {
  constructor(webDriver, loanId) {
    super(webDriver);
    this.url = urls.underwriterPortal;
    this.loanId = loanId;
    this.button = {
      applicantDetails: By.xpath('//span[contains(text(), "Applicant")]/..//button')
    };
    this.modal = {
      display: By.xpath('//div[@class="modal fade show"]'),
      applicantDetails: {
        firstName: By.xpath('//input[@id="first-name"]'),
        lastName: By.xpath('//input[@id="last-name"]'),
        street: By.xpath('//input[@id="street"]'),
        city: By.xpath('//input[@id="city"]'),
        state: By.xpath('//input[@id="state"]'),
        zip: By.xpath('//input[@id="zip"]'),
        phone: By.xpath('//input[@id="phone"]'),
        email: By.xpath('//input[@id="email"]'),
        dob: By.xpath('//label[contains(text(), "DOB")]//following-sibling::input'),
        ssn: By.xpath('//input[@id="ssn"]'),
        employer: By.xpath('//input[@id="employer"]'),
        annualIncome: By.xpath('//input[@id="annualIncome"]'),
        spokenLanguage: By.xpath('//button[@id="SpokenLanguageDropdownDropdown"]')
      }
    };
  }

  async openURL() {
    await this.sleep(2000);
    await this.openUrl(`${this.url}/loan-details?id=${this.loanId}`);
  }

  async clickEditIcon() {
    await this.sleep(2000);
    const editButton = await this.waitForElementLocated(this.button.applicantDetails, 5000);
    await editButton.click();
  }

  async displayModal() {
    await this.sleep(2000);
    const modal = await this.waitForElementLocated(this.modal.display, 5000);
    return modal;
  }

  async verifyApplicantData() {
    console.log('Verifying Applicant Data...');
    const loanData = new LoanData(this.loanId);
    const loan = await loanData.getSrcLoan();
    const {
      application: { applicant }
    } = loan;
    // Store fields
    const firstName = await this.waitForElementLocated(this.modal.applicantDetails.firstName, 5000).then(item => {
      return item.getAttribute('value');
    });
    const lastName = await this.waitForElementLocated(this.modal.applicantDetails.lastName, 5000).then(item => {
      return item.getAttribute('value');
    });
    const street = await this.waitForElementLocated(this.modal.applicantDetails.street, 5000).then(item => {
      return item.getAttribute('value');
    });
    const city = await this.waitForElementLocated(this.modal.applicantDetails.city, 5000).then(item => {
      return item.getAttribute('value');
    });
    const state = await this.waitForElementLocated(this.modal.applicantDetails.state, 5000).then(item => {
      return item.getAttribute('value');
    });
    const zip = await this.waitForElementLocated(this.modal.applicantDetails.zip, 5000).then(item => {
      return item.getAttribute('value');
    });
    const phone = await this.waitForElementLocated(this.modal.applicantDetails.phone, 5000).then(item => {
      return item.getAttribute('value');
    });
    const email = await this.waitForElementLocated(this.modal.applicantDetails.email, 5000).then(item => {
      return item.getAttribute('value');
    });
    const dob = await this.waitForElementLocated(this.modal.applicantDetails.dob, 5000).then(item => {
      return item.getAttribute('value');
    });
    const ssn = await this.waitForElementLocated(this.modal.applicantDetails.ssn, 5000).then(item => {
      return item.getAttribute('value');
    });
    const employer = await this.waitForElementLocated(this.modal.applicantDetails.employer, 5000).then(item => {
      return item.getAttribute('value');
    });
    const annualIncome = await this.waitForElementLocated(this.modal.applicantDetails.annualIncome, 5000).then(item => {
      return item.getAttribute('value');
    });
    const spokenLanguage = await this.waitForElementLocated(this.modal.applicantDetails.spokenLanguage, 5000).then(item => {
      return item.getText();
    });
    const applicantDOBMoment = moment.utc(new Date(applicant.dob)).format('YYYY-MM-DD');
    const dynamoDOBMoment = moment.utc(new Date(dob)).format('YYYY-MM-DD');
    const comparedValues = [
      { v1: `First Name: ${applicant.firstName}`, v2: `First Name: ${firstName}` },
      { v1: `Last Name: ${applicant.lastName}`, v2: `Last Name: ${lastName}` },
      { v1: `Street: ${applicant.address.street}`, v2: `Street: ${street}` },
      { v1: `City: ${applicant.address.city}`, v2: `City: ${city}` },
      { v1: `State: ${applicant.address.state}`, v2: `State: ${state}` },
      { v1: `Zip: ${applicant.address.zip}`, v2: `Zip: ${zip}` },
      { v1: `Phone: ${applicant.phone}`, v2: `Phone: ${phone}` },
      { v1: `Email: ${applicant.email}`, v2: `Email: ${email}` },
      { v1: `DOB: ${applicantDOBMoment}`, v2: `DOB: ${dynamoDOBMoment}` },
      { v1: `SSN: ${applicant.ssn}`, v2: `SSN: ${ssn}` },
      { v1: `Employer: ${applicant.employer}`, v2: `Employer: ${employer}` },
      { v1: `Income: ${applicant.annualIncome}`, v2: `Income: ${annualIncome}` },
      { v1: `Language: ${applicant.spokenLanguage.toUpperCase()}`, v2: `Language: ${spokenLanguage.toUpperCase()}` }
    ];
    return comparedValues;
  }
}
