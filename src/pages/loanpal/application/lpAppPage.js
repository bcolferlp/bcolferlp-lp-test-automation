import BasePageObject from '../../../base/basePageObject';

const { By } = require('selenium-webDriver');

export default class LPAppPage extends BasePageObject {
  constructor(webDriver, url) {
    super(webDriver);
    this.url = url;
    // Xpath
    this.loadTarget = By.xpath('//h1[contains(text(), "Get approved now")]');
    // INPUT ELEMENTS
    this.input = {
      systemCost: By.xpath('//label[contains(text(),"Estimated System Cost")]/following-sibling::input'),
      // Primary Borrower
      firstName: By.xpath('//input[@id="firstName"]'),
      lastName: By.xpath('//input[@id="lastName"]'),
      addressStreet: By.xpath('//input[@id="addressStreet"]'),
      addressCity: By.xpath('//input[@id="addressCity"]'),
      addressZip: By.xpath('//input[@id="addressZip"]'),
      mobilePhone: {
        prefix1: By.xpath('//input[@id="mobilePhonePrefix1"]'),
        prefix2: By.xpath('//input[@id="mobilePhonePrefix2"]'),
        prefix3: By.xpath('//input[@id="mobilePhonePrefix3"]')
      },
      homePhone: {
        prefix1: By.xpath('//input[@id="phonePrefix1"]'),
        prefix2: By.xpath('//input[@id="phonePrefix2"]'),
        prefix3: By.xpath('//input[@id="phonePrefix3"]')
      },
      last4SSN: By.xpath('//input[@id="ssnPrefix3"]'),
      email: By.xpath('//input[@id="email"]'),
      annualIncome: By.xpath('//input[@id="annualIncome"]'),
      citizenship: {
        citizen: By.xpath('(//input[@value="US Citizen"])[1]'),
        alien: By.xpath('(//input[@value="Lawful Permanent Resident Alien"])[1]'),
        other: By.xpath('(//input[@value="Other"])[1]')
      },
      // Secondary Borrower
      coFirstName: By.xpath('//input[@id="firstName2"]'),
      coLastName: By.xpath('//input[@id="lastName2"]'),
      coAddressStreet: By.xpath('//input[@id="addressStreet2"]'),
      coAddressCity: By.xpath('//input[@id="addressCity2"]'),
      coAddressZip: By.xpath('//input[@id="addressZip2"]'),
      coMobilePhone: {
        prefix1: By.xpath('//input[@id="mobilePhonePrefix12"]'),
        prefix2: By.xpath('//input[@id="mobilePhonePrefix22"]'),
        prefix3: By.xpath('//input[@id="mobilePhonePrefix32"]')
      },
      coHomePhone: {
        prefix1: By.xpath('//input[@id="phonePrefix12"]'),
        prefix2: By.xpath('//input[@id="phonePrefix22"]'),
        prefix3: By.xpath('//input[@id="phonePrefix32"]')
      },
      coLast4SSN: By.xpath('//input[@id="ssnPrefix32"]'),
      coEmail: By.xpath('//input[@id="email2"]'),
      coAnnualIncome: By.xpath('//input[@id="annualIncome2"]'),
      coCitizenship: {
        citizen: By.xpath('(//input[@value="US Citizen"])[2]'),
        alien: By.xpath('(//input[@value="Lawful Permanent Resident Alien"])[2]'),
        other: By.xpath('(//input[@value="Other"])[2]')
      },
      // Sales Rep
      srFirstName: By.xpath('//label[contains(text(),"Sales Rep First Name")]/following-sibling::input'),
      srLastName: By.xpath('//label[contains(text(),"Sales Rep Last Name")]/following-sibling::input'),
      srEmail: By.xpath('//label[contains(text(),"Sales Rep Email")]/following-sibling::input'),
      srMobilePhone: {
        prefix1: By.xpath('//input[@id="mobilePhonePrefix13"]'),
        prefix2: By.xpath('//input[@id="mobilePhonePrefix23"]'),
        prefix3: By.xpath('//input[@id="mobilePhonePrefix33"]')
      },
      srCompanyName: By.xpath('//label[contains(text(),"Company")]/following-sibling::input')
    };
    // SELECT ELEMENTS
    this.select = {
      language: By.xpath('//label[contains(text(), "Preferred Language")]/following-sibling::select'),
      loanTerm: By.xpath('//select[option[contains(text(), "Select Loan Term")]]'),
      // Primary Borrower
      addressState: By.xpath('//select[@id="addressState"]'),
      dateOfBirth: {
        month: By.xpath('//select[@id="birthdayMonth"]'),
        day: By.xpath('//select[@id="birthdayDay"]'),
        year: By.xpath('//select[@id="birthdayYear"]')
      },
      employmentStatus: By.xpath('//select[@name="employmentStatus"]'),
      // Secondary Borrower
      coAddressState: By.xpath('//select[@id="addressState2"]'),
      coDateOfBirth: {
        month: By.xpath('//select[@id="birthdayMonth2"]'),
        day: By.xpath('//select[@id="birthdayDay2"]'),
        year: By.xpath('//select[@id="birthdayYear2"]')
      },
      coEmploymentStatus: By.xpath('//select[@name="coborrowerEmploymentStatus"]')
    };
    // BUTTON ELEMENTS
    this.button = {
      /* TODO */
    };
    // CHECKBOX ELEMENTS
    this.checkbox = {
      /* TODO */
    };
    // SIGNATURE ELEMENT
    this.signature = {
      /* TODO */
    };
  }
}
