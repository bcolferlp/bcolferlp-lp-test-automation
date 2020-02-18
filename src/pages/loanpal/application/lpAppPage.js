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
      referenceNumber: By.xpath('//label[contains(text(), "Reference")]//following-sibling::input'),
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
      coSSN: {
        prefix1: By.xpath('//input[@id="ssnPrefix12"]'),
        prefix2: By.xpath('//input[@id="ssnPrefix22"]'),
        prefix3: By.xpath('//input[@id="ssnPrefix32"]')
      },
      coEmail: By.xpath('//input[@id="email2"]'),
      coAnnualIncome: By.xpath('//input[@id="annualIncome2"]'),
      coCitizenship: {
        us: By.xpath('(//input[@value="US Citizen"])[2]'),
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
      language: value => By.xpath(`//label[contains(text(), "Preferred Language / Idioma Preferido")]/following-sibling::select//option[@value="${value}"]`),
      loanTerm: value => By.xpath(`//select[option[contains(text(), "Select Loan Term")]]//option[@value="${value}"]`),
      // Primary Borrower
      addressState: value => By.xpath(`//select[@id="addressState"]//option[@value="${value}"]`),
      dateOfBirth: {
        month: value => By.xpath(`//select[@id="birthdayMonth"]/option[@value="${value}"]`),
        day: value => By.xpath(`//select[@id="birthdayDay"]/option[@value="${value}"]`),
        year: value => By.xpath(`//select[@id="birthdayYear"]/option[@value="${value}"]`)
      },
      employmentStatus: value => By.xpath(`//select[@name="employmentStatus"]//option[@value="${value}"]`),
      // Secondary Borrower
      coAddressState: value => By.xpath(`//select[@id="addressState2"]//option[@value="${value}"]`),
      coDateOfBirth: {
        month: value => By.xpath(`//select[@id="birthdayMonth2"]/option[@value="${value}"]`),
        day: value => By.xpath(`//select[@id="birthdayDay2"]/option[@value="${value}"]`),
        year: value => By.xpath(`//select[@id="birthdayYear2"]/option[@value="${value}"]`)
      },
      coEmploymentStatus: value => By.xpath(`//select[@name="coborrowerEmploymentStatus"]//option[@value="${value}"]`)
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

    // Approval Page
    this.header = {
      keyLoanTerms: By.xpath('//*[text()="Key Loan Terms"]'),
      loanID: By.xpath('//*[text()="Loan ID"]/following-sibling::*'),
      referenceNumber: By.xpath('//*[text()="Reference Number"]/following-sibling::*'),
      loanAmount: By.xpath('//*[contains(text(),"Loan Amount")]/preceding-sibling::*'),
      loanTerm: By.xpath('//span[text()="Loan Term"]/preceding-sibling::*'),
      loanRate: By.xpath('//*[text()="Loan Rate"]/preceding-sibling::*')
    };
    this.link = {
      srEmail: By.xpath('//*[contains(text(),"Sales Rep Email")]/following-sibling::a')
    };
  }

  async goToPage(url) {
    await this.fullScreen();
    await this.openUrl(url);
    await this.waitForTarget(this.loadTarget);
  }

  async coborrowerData(record) {
    console.log('Adding CoBorrower');
    const [addCoBorrower] = await this.findElements(this.button.addCoBorrower);
    if (addCoBorrower) await addCoBorrower.click();
    await this.sleep(1000);
    // Cobo data
    const [coFirstname] = await this.findElements(this.input.coFirstName);
    if (coFirstname) await this.enterText(coFirstname, record.firstName);
    const [coLastName] = await this.findElements(this.input.coLastName);
    if (coLastName) await this.enterText(coLastName, record.lastName);
    // Address
    if (record.coAddressStreet) {
      const [secondaryStreet] = await this.findElements(this.input.coAddressStreet);
      if (secondaryStreet) await this.enterText(secondaryStreet, record.coAddressStreet);
      const [secondaryCity] = await this.findElements(this.input.coAddressCity);
      if (secondaryCity) await this.enterText(secondaryCity, record.coAddressCity);
      const [secondaryState] = await this.findElements(this.select.coAddressState(record.coAddressState || Object.keys(record.loanOptionsMap)[0]));
      if (secondaryState) await secondaryState.click();
      const [secondaryZip] = await this.findElements(this.input.coAddressZip);
      if (secondaryZip) await this.enterText(secondaryZip, record.coAddressZip);
    } else {
      const [sameAddress] = await this.findElements(this.checkbox.sameAddress);
      if (sameAddress) await sameAddress.click();
    }
    // Secondary Mobile Phone
    const [secondaryMobilePrefix1] = await this.findElements(this.input.coMobilePhone.prefix1);
    if (secondaryMobilePrefix1) await this.enterText(secondaryMobilePrefix1, record.coMobilePhone.substr(0, 3));
    const [secondaryMobilePrefix2] = await this.findElements(this.input.coMobilePhone.prefix2);
    if (secondaryMobilePrefix2) await this.enterText(secondaryMobilePrefix2, record.coMobilePhone.substr(3, 3));
    const [secondaryMobilePrefix3] = await this.findElements(this.input.coMobilePhone.prefix3);
    if (secondaryMobilePrefix3) await this.enterText(secondaryMobilePrefix3, record.coMobilePhone.substr(6, 4));
    // secondary Home Phone
    const [secondaryHomePrefix1] = await this.findElements(this.input.coHomePhone.prefix1);
    if (secondaryHomePrefix1) await this.enterText(secondaryHomePrefix1, record.coHomePhone.substr(0, 3));
    const [secondaryHomePrefix2] = await this.findElements(this.input.coHomePhone.prefix2);
    if (secondaryHomePrefix2) await this.enterText(secondaryHomePrefix2, record.coHomePhone.substr(3, 3));
    const [secondaryHomePrefix3] = await this.findElements(this.input.coHomePhone.prefix3);
    if (secondaryHomePrefix3) await this.enterText(secondaryHomePrefix3, record.coHomePhone.substr(6, 4));
    // secondary DOB
    const [secondaryBirthMonth] = await this.findElements(this.select.coDateOfBirth.month(record.coDateOfBirth.split('-')[1]));
    if (secondaryBirthMonth) await secondaryBirthMonth.click();
    const [secondaryBirthDay] = await this.findElements(this.select.coDateOfBirth.day(record.coDateOfBirth.split('-')[2]));
    if (secondaryBirthDay) await secondaryBirthDay.click();
    const [secondaryBirthYear] = await this.findElements(this.select.coDateOfBirth.year(record.coDateOfBirth.split('-')[0]));
    if (secondaryBirthYear) await secondaryBirthYear.click();
    // secondary SSN
    const [secondarySSN1] = await this.findElements(this.input.coSSN.prefix1);
    if (secondarySSN1) await this.enterText(secondarySSN1, record.coSSN.substr(0, 3));
    const [secondarySSN2] = await this.findElements(this.input.coSSN.prefix2);
    if (secondarySSN2) await this.enterText(secondarySSN2, record.coSSN.substr(3, 2));
    const [secondarySSN3] = await this.findElements(this.input.coSSN.prefix3);
    if (secondarySSN3) await this.enterText(secondarySSN3, record.coSSN.substr(5, 4));
    // secondary Email
    const [secondaryEmail] = await this.findElements(this.input.coEmail);
    if (secondaryEmail) await this.enterText(secondaryEmail, record.coEmail);
    // secondary Income
    const [secondaryIncome] = await this.findElements(this.input.coAnnualIncome);
    if (secondaryIncome) await this.enterText(secondaryIncome, record.coAnnualIncome);
    // secondary Employment
    const [secondaryEmployment] = await this.findElements(this.select.coEmploymentStatus(record.coEmploymentStatus || 'Employed'));
    if (secondaryEmployment) await secondaryEmployment.click();
    // secondary Citizenship
    const [secondaryCitizenship] = await this.findElements(this.input.coCitizenship[record.coCitizenship || 'us']);
    if (secondaryCitizenship) await secondaryCitizenship.click();
  }

  async fillOutForm(record) {
    // Primary applicant personal data
    const [primaryFirstname] = await this.findElements(this.input.firstName);
    if (primaryFirstname) await this.enterText(primaryFirstname, record.firstName);
    const [primaryLastName] = await this.findElements(this.input.lastName);
    if (primaryLastName) await this.enterText(primaryLastName, record.lastName);
    const [primaryStreet] = await this.findElements(this.input.addressStreet);
    if (primaryStreet) await this.enterText(primaryStreet, record.addressStreet);
    const [primaryCity] = await this.findElements(this.input.addressCity);
    if (primaryCity) await this.enterText(primaryCity, record.addressCity);
    const [primaryState] = await this.findElements(this.select.addressState(record.addressState || Object.keys(record.loanOptionsMap)[0]));
    if (primaryState) await primaryState.click();
    const [primaryZip] = await this.findElements(this.input.addressZip);
    if (primaryZip) await this.enterText(primaryZip, record.addressZip);
    // Primary Mobile Phone
    const [primaryMobilePrefix1] = await this.findElements(this.input.mobilePhone.prefix1);
    if (primaryMobilePrefix1) await this.enterText(primaryMobilePrefix1, record.mobilePhone.substr(0, 3));
    const [primaryMobilePrefix2] = await this.findElements(this.input.mobilePhone.prefix2);
    if (primaryMobilePrefix2) await this.enterText(primaryMobilePrefix2, record.mobilePhone.substr(3, 3));
    const [primaryMobilePrefix3] = await this.findElements(this.input.mobilePhone.prefix3);
    if (primaryMobilePrefix3) await this.enterText(primaryMobilePrefix3, record.mobilePhone.substr(6, 4));
    // Primary Home Phone
    const [primaryHomePrefix1] = await this.findElements(this.input.homePhone.prefix1);
    if (primaryHomePrefix1) await this.enterText(primaryHomePrefix1, record.homePhone.substr(0, 3));
    const [primaryHomePrefix2] = await this.findElements(this.input.homePhone.prefix2);
    if (primaryHomePrefix2) await this.enterText(primaryHomePrefix2, record.homePhone.substr(3, 3));
    const [primaryHomePrefix3] = await this.findElements(this.input.homePhone.prefix3);
    if (primaryHomePrefix3) await this.enterText(primaryHomePrefix3, record.homePhone.substr(6, 4));
    // Primary DOB
    const [primaryBirthMonth] = await this.findElements(this.select.dateOfBirth.month(record.dateOfBirth.split('-')[1]));
    if (primaryBirthMonth) await primaryBirthMonth.click();
    const [primaryBirthDay] = await this.findElements(this.select.dateOfBirth.day(record.dateOfBirth.split('-')[2]));
    if (primaryBirthDay) await primaryBirthDay.click();
    const [primaryBirthYear] = await this.findElements(this.select.dateOfBirth.year(record.dateOfBirth.split('-')[0]));
    if (primaryBirthYear) await primaryBirthYear.click();
    // Primary SSN
    const [primarySSN1] = await this.findElements(this.input.ssn.prefix1);
    if (primarySSN1) await this.enterText(primarySSN1, record.ssn.substr(0, 3));
    const [primarySSN2] = await this.findElements(this.input.ssn.prefix2);
    if (primarySSN2) await this.enterText(primarySSN2, record.ssn.substr(3, 2));
    const [primarySSN3] = await this.findElements(this.input.ssn.prefix3);
    if (primarySSN3) await this.enterText(primarySSN3, record.ssn.substr(5, 4));
    // Primary Email
    const [primaryEmail] = await this.findElements(this.input.email);
    if (primaryEmail) await this.enterText(primaryEmail, record.email);
    // Primary Income
    const [primaryIncome] = await this.findElements(this.input.annualIncome);
    if (primaryIncome) await this.enterText(primaryIncome, record.annualIncome);
    // Primary Employment
    const [primaryEmployment] = await this.findElements(this.select.employmentStatus(record.employmentStatus || 'Employed'));
    if (primaryEmployment) await primaryEmployment.click();
    // Primary Citizenship
    const [primaryCitizenship] = await this.findElements(this.input.citizenship[record.citizenship || 'us']);
    if (primaryCitizenship) await primaryCitizenship.click();

    // ADD A COBORROWER
    if (record.coFirstName) await this.coborrowerData(record);

    // Language
    const [preferredLanguage] = await this.findElements(this.select.language(record.language || 'english'));
    if (preferredLanguage) await preferredLanguage.click();
    // Sales rep data
    const [repFirstName] = await this.findElements(this.input.srFirstName);
    if (repFirstName) await this.enterText(repFirstName, record.srFirstName);
    const [repLastName] = await this.findElements(this.input.srLastName);
    if (repLastName) await this.enterText(repLastName, record.srLastName);
    const [repEmail] = await this.findElements(this.input.srEmail);
    if (repEmail) await this.enterText(repEmail, record.srEmail);
    // Sale Rep Mobile Phone
    const [repMobilePrefix1] = await this.findElements(this.input.srMobilePhone.prefix1);
    if (repMobilePrefix1) await this.enterText(repMobilePrefix1, record.srMobilePhone.substr(0, 3));
    const [repMobilePrefix2] = await this.findElements(this.input.srMobilePhone.prefix2);
    if (repMobilePrefix2) await this.enterText(repMobilePrefix2, record.srMobilePhone.substr(3, 3));
    const [repMobilePrefix3] = await this.findElements(this.input.srMobilePhone.prefix3);
    if (repMobilePrefix3) await this.enterText(repMobilePrefix3, record.srMobilePhone.substr(6, 4));
    // Sales Rep Company
    const [repCompany] = await this.findElements(this.input.srCompanyName);
    if (repCompany) await this.enterText(repCompany, record.srCompanyName);
    // Loan Term
    const [loanTerm] = await this.findElements(this.select.loanTerm(record.loanTerm || record.loanOptionsMap[Object.keys(record.loanOptionsMap)[0]][0]));
    if (loanTerm) await loanTerm.click();
    // Reference Number
    const [refNum] = await this.findElements(this.input.referenceNumber);
    if (refNum) await this.enterText(refNum, record.referenceNumber);
    // System Cost
    const [systemCost] = await this.findElements(this.input.systemCost);
    if (systemCost) await this.enterText(systemCost, record.systemCost);
    // Checkboxes
    const [verifyOwner] = await this.findElements(this.checkbox.verifyOwner);
    if (verifyOwner) await verifyOwner.click();
    const [verifyOccupy] = await this.findElements(this.checkbox.verifyOccupy);
    if (verifyOccupy) await verifyOccupy.click();
    const [verifyESign] = await this.findElements(this.checkbox.verifyESign);
    if (verifyESign) await verifyESign.click();
    const [verifyCredit] = await this.findElements(this.checkbox.verifyCredit);
    if (verifyCredit) await verifyCredit.click();
    // Signature
    const [sign] = await this.findElements(this.signature);
    if (sign) await sign.click();
    // Buttons
    const [approveBtn] = await this.findElements(this.button.approveSignature);
    if (approveBtn) await approveBtn.click();
    const [submitBtn] = await this.findElements(this.button.submitApplication);
    if (submitBtn) await submitBtn.click();
  }

  async reviewInfo() {
    await this.waitForTarget(this.button.applyNow);
    const [origAddress, origAddress2] = await this.findElements(this.button.origAddress);
    if (origAddress) await origAddress.click();
    if (origAddress2) await origAddress2.click();
  }

  async apply() {
    const [applyNowBtn] = await this.findElements(this.button.applyNow);
    if (applyNowBtn) await applyNowBtn.click();
    await this.waitForTarget(this.header.keyLoanTerms, 0, 10);
  }

  async getLoanID() {
    const [loanId] = await this.findElements(this.header.loanID);
    const loanText = await loanId.getAttribute('textContent');
    console.log('Loan ID:', loanText);
    return loanText;
  }
}
