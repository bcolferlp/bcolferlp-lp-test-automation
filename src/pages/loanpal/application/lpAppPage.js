import BasePageObject from '../../../base/basePageObject';

const { By } = require('selenium-webDriver');

export default class LPAppPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
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
      ssn: {
        prefix1: By.xpath('//input[@id="ssnPrefix1"]'),
        prefix2: By.xpath('//input[@id="ssnPrefix2"]'),
        prefix3: By.xpath('//input[@id="ssnPrefix3"]')
      },
      email: By.xpath('//input[@id="email"]'),
      annualIncome: By.xpath('//input[@id="annualIncome"]'),
      citizenship: {
        us: By.xpath('(//input[@value="US Citizen"])[1]'),
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
      addCoBorrower: By.xpath('//a[contains(text(), "Add Co-borrower")]'),
      removeCoBorrower: By.xpath('//a[contains(text(), "Remove Co-borrower")]'),
      clearSignature: By.xpath('//button[contains(text(), "Clear")]'),
      approveSignature: By.xpath('//button[contains(text(), "Approve")]'),
      submitApplication: By.xpath('//button[contains(text(), "Submit")]'),
      origAddress: By.xpath('//button[@value="Original Address"]'),
      applyNow: By.xpath('//button[contains(text(),"Apply Now")]')
    };
    // CHECKBOX ELEMENTS
    this.checkbox = {
      sameAddress: By.xpath('//label[contains(text(), "Same address")]/../preceding-sibling::input[@type="checkbox"]'),
      verifyOwner: By.xpath('//label[contains(text(), "owner")]/../preceding-sibling::input[@type="checkbox"]'),
      verifyOccupy: By.xpath('//label[contains(text(), "occupy")]/../preceding-sibling::input[@type="checkbox"]'),
      verifyESign: By.xpath('//label[contains(text(), "E-Sign")]/../preceding-sibling::input[@type="checkbox"]'),
      verifyCredit: By.xpath('//label[contains(text(), "credit")]/../preceding-sibling::input[@type="checkbox"]')
    };
    // SIGNATURE ELEMENT
    this.signature = By.xpath('//canvas');
  }

  async goToPage(url) {
    await this.fullScreen();
    await this.openUrl(url);
    await this.waitForTarget(this.loadTarget);
  }

  async fillOutForm(record) {
    // Primary applicant data
    const [primaryFirstname] = await this.findElements(this.input.firstName);
    const [primaryLastName] = await this.findElements(this.input.lastName);
    const [primaryStreet] = await this.findElements(this.input.addressStreet);
    const [primaryCity] = await this.findElements(this.input.addressCity);
    const [primaryState] = await this.findElements(this.select.addressState);
    const [primaryZip] = await this.findElements(this.input.addressZip);
    const [primaryMobilePrefix1] = await this.findElements(this.input.mobilePhone.prefix1);
    const [primaryMobilePrefix2] = await this.findElements(this.input.mobilePhone.prefix2);
    const [primaryMobilePrefix3] = await this.findElements(this.input.mobilePhone.prefix3);
    const [primaryHomePrefix1] = await this.findElements(this.input.homePhone.prefix1);
    const [primaryHomePrefix2] = await this.findElements(this.input.homePhone.prefix2);
    const [primaryHomePrefix3] = await this.findElements(this.input.homePhone.prefix3);
    const [primaryBirthMonth] = await this.findElements(this.select.dateOfBirth.month);
    const [primaryBirthDay] = await this.findElements(this.select.dateOfBirth.day);
    const [primaryBirthYear] = await this.findElements(this.select.dateOfBirth.year);
    const [primarySSN1] = await this.findElements(this.input.ssn.prefix1);
    const [primarySSN2] = await this.findElements(this.input.ssn.prefix2);
    const [primarySSN3] = await this.findElements(this.input.ssn.prefix3);
    const [primaryEmail] = await this.findElements(this.input.email);
    const [primaryIncome] = await this.findElements(this.input.annualIncome);
    const [primaryEmployment] = await this.findElements(this.select.employmentStatus);
    const [primaryCitizenship] = await this.findElements(this.input.citizenship[record.citizenship || 'us']);
    // Language
    const [preferredLanguage] = await this.findElements(this.select.language);
    // Sales rep data
    const [repFirstName] = await this.findElements(this.input.srFirstName);
    const [repLastName] = await this.findElements(this.input.srLastName);
    const [repEmail] = await this.findElements(this.input.srEmail);
    const [repMobilePrefix1] = await this.findElements(this.input.srMobilePhone.prefix1);
    const [repMobilePrefix2] = await this.findElements(this.input.srMobilePhone.prefix2);
    const [repMobilePrefix3] = await this.findElements(this.input.srMobilePhone.prefix3);
    const [repCompany] = await this.findElements(this.input.srCompanyName);
    // Loan term and rate
    const [loanterm] = await this.findElements(this.select.loanTerm);
    const [systemCost] = await this.findElements(this.input.systemCost);
    const [verifyOwner] = await this.findElements(this.checkbox.verifyOwner);
    const [verifyOccupy] = await this.findElements(this.checkbox.verifyOccupy);
    const [verifyESign] = await this.findElements(this.checkbox.verifyESign);
    const [verifyCredit] = await this.findElements(this.checkbox.verifyCredit);
    const [sign] = await this.findElements(this.signature);
    const [approveBtn] = await this.findElements(this.button.approveSignature);
    const [submitBtn] = await this.findElements(this.button.submitApplication);

    if (primaryFirstname) await this.enterText(primaryFirstname, record.firstName);
    if (primaryLastName) await this.enterText(primaryLastName, record.lastName);
    if (primaryStreet) await this.enterText(primaryStreet, record.addressStreet);
    if (primaryCity) await this.enterText(primaryCity, record.addressCity);
    if (primaryState) await primaryState.findElement(By.xpath(`//option[@value="${record.addressState}"]`)).click();
    if (primaryZip) await this.enterText(primaryZip, record.addressZip);
    if (primaryMobilePrefix1) await this.enterText(primaryMobilePrefix1, record.mobilePhone.substr(0, 3));
    if (primaryMobilePrefix2) await this.enterText(primaryMobilePrefix2, record.mobilePhone.substr(3, 3));
    if (primaryMobilePrefix3) await this.enterText(primaryMobilePrefix3, record.mobilePhone.substr(6, 4));
    if (primaryHomePrefix1) await this.enterText(primaryHomePrefix1, record.homePhone.substr(0, 3));
    if (primaryHomePrefix2) await this.enterText(primaryHomePrefix2, record.homePhone.substr(3, 3));
    if (primaryHomePrefix3) await this.enterText(primaryHomePrefix3, record.homePhone.substr(6, 4));
    // MONTH
    if (primaryBirthMonth) {
      const monthOptions = await primaryBirthMonth.findElements(By.tagName('option'));
      for (const opt of monthOptions) {
        const val = await opt.getAttribute('value');
        if (val === record.dateOfBirth.split('-')[1]) {
          await opt.click();
        }
      }
    }
    // DAY
    if (primaryBirthDay) {
      const dayOptions = await primaryBirthDay.findElements(By.tagName('option'));
      for (const opt of dayOptions) {
        const val = await opt.getAttribute('value');
        if (val === record.dateOfBirth.split('-')[2]) {
          await opt.click();
        }
      }
    }
    // YEAR
    if (primaryBirthYear) {
      const yearOptions = await primaryBirthYear.findElements(By.tagName('option'));
      for (const opt of yearOptions) {
        const val = await opt.getAttribute('value');
        if (val === record.dateOfBirth.split('-')[0]) {
          await opt.click();
        }
      }
    }
    // If old UI
    if (primarySSN1) await this.enterText(primarySSN1, record.ssn.substr(0, 3));
    if (primarySSN2) await this.enterText(primarySSN2, record.ssn.substr(3, 2));
    if (primarySSN3) await this.enterText(primarySSN3, record.ssn.substr(5, 4));
    if (primaryEmail) await this.enterText(primaryEmail, record.email);
    if (primaryIncome) await this.enterText(primaryIncome, record.annualIncome);
    if (primaryEmployment) await primaryEmployment.findElement(By.xpath(`//option[@value="${record.employmentStatus}"]`)).click();
    if (primaryCitizenship) await primaryCitizenship.click();
    // if language is provided
    if (record.language) await preferredLanguage.findElement(By.xpath(`//option[@value="${record.language}"]`)).click();

    if (repFirstName) await this.enterText(repFirstName, record.srFirstName);
    if (repLastName) await this.enterText(repLastName, record.srLastName);
    if (repEmail) await this.enterText(repEmail, record.srEmail);
    if (repMobilePrefix1) {
      await this.enterText(repMobilePrefix1, record.srMobilePhone.substr(0, 3));
      await this.enterText(repMobilePrefix2, record.srMobilePhone.substr(3, 3));
      await this.enterText(repMobilePrefix3, record.srMobilePhone.substr(6, 4));
    }
    if (repCompany) await this.enterText(repCompany, record.srCompanyName);
    if (loanterm) await loanterm.findElement(By.xpath(`//option[contains(text(), "${record.loanTerm}")]`)).click();
    if (systemCost) await this.enterText(systemCost, record.systemCost);

    if (verifyOwner) await verifyOwner.click();
    if (verifyOccupy) await verifyOccupy.click();
    if (verifyESign) await verifyESign.click();
    if (verifyCredit) await verifyCredit.click();
    if (sign) await sign.click();
    if (approveBtn) await approveBtn.click();
    if (submitBtn) await submitBtn.click();
  }

  async reviewInfo() {
    await this.waitForTarget(this.button.applyNow);
    const [origAddress] = await this.findElements(this.button.origAddress);
    if (origAddress) await origAddress.click();
  }

  async apply() {
    const [applyNowBtn] = await this.findElements(this.button.applyNow);
    // if (applyNowBtn) await applyNowBtn.click();
  }
}
