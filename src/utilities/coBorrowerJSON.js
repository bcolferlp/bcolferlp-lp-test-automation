const jsonload = require('jsonload');

export default class CoBorrowerJSON {
  constructor() {
<<<<<<< HEAD
    this.jsonFile = '../../data/loanDocs/newLoanTemplatesJSON/coBorrowerLoanTemplate.json';
  }

  updateJson(
    productType, clientId, firstName, lastName, street, state, email, spokenLanguage, source, salesRepEmail, coFirstName, coLastName, coStreet, coState, coEmail, testNumber
  ) {
    const jsonData = jsonload.sync(this.jsonFile);
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
=======
    this.jsonFile = '../../data/loanDocs/newLoanTemplatesJSON/coBorrowerLoan.json';
  }

  updateJson(
    productType,
    language,
    state,
    client,
    borrowerFname,
    borrowerLname,
    address,
    borrowerEmail,
    coboFname,
    coboLname,
    coboAddress,
    coboState,
    coboEmail,
    salesRepEmail,
    bucket,
    key
  ) {
    const jsonData = jsonload.sync(this.jsonFile);
    jsonData.overrideResponse.Bucket = bucket;
    jsonData.overrideResponse.Key = key;
    jsonData.productType = productType;
    jsonData.clientId = client;
    jsonData.applicant.firstName = borrowerFname;
    jsonData.applicant.lastName = borrowerLname;
    jsonData.applicant.address.street = address;
    jsonData.applicant.address.state = state;
    jsonData.applicant.email = borrowerEmail;
    jsonData.applicant.spokenLanguage = language;
    jsonData.salesRep.email = salesRepEmail;
    // co applicant
    jsonData.coApplicants[0].firstName = coboFname;
    jsonData.coApplicants[0].lastName = coboLname;
    jsonData.coApplicants[0].address.street = coboAddress;
    jsonData.coApplicants[0].email = coboEmail;
    jsonData.coApplicants[0].address.state = coboState;
    return jsonData;
  }
}
>>>>>>> master
