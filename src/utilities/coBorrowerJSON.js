const jsonload = require('jsonload');

export default class CoBorrowerJSON {
  constructor() {
    this.jsonFile = '../../data/loanDocs/newLoanTemplatesJSON/coBorrowerLoanTemplate.json';
  }

  updateJson(
    productType,
    clientId,
    firstName,
    lastName,
    street,
    state,
    email,
    spokenLanguage,
    source,
    salesRepEmail,
    coFirstName,
    coLastName,
    coStreet,
    coState,
    coEmail,
    testNumber
  ) {
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
    // co applicant
    jsonData.coApplicants[0].firstName = coFirstName;
    jsonData.coApplicants[0].lastName = coLastName;
    jsonData.coApplicants[0].address.street = coStreet;
    jsonData.coApplicants[0].address.state = coState;
    jsonData.coApplicants[0].email = coEmail;
    return jsonData;
  }
}
