const jsonload = require('jsonload');

export default class SingleBorrowerJSON {
  constructor() {
    this.jsonFile = '../../data/loanDocs/newLoanTemplatesJSON/singleBorrowerLoanTemplate.json';
  }

  updateJson(productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, testNumber) {
    const jsonData = jsonload.sync(this.jsonFile);
    jsonData.overrideResponse.Bucket = `${process.env.STAGE}-core.loanpal.com`;
    jsonData.productType = productType;
    jsonData.clientId = clientId;
    jsonData.applicant.firstName = firstName;
    jsonData.applicant.lastName = lastName;
    jsonData.applicant.address.street = street;
    jsonData.applicant.address.state = state;
    jsonData.applicant.email = email;
    jsonData.applicant.spokenLanguage = spokenLanguage;
    jsonData.source = source;
    jsonData.salesRep.email = salesRepEmail;
    jsonData.referenceNumber = `automated-${testNumber}`;
    return jsonData;
  }
}
