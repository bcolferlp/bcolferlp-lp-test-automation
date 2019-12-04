const jsonload = require('jsonload')

export default class TemplateJSON{

    constructor(){
        this.jsonFile = '../../data/singleBorrowerLoan.json'
    }

    updateJson(clientId, firstName, lastName, street, state, email, spokenLanguage, source){
        let jsonData = jsonload.sync(this.jsonFile)
        jsonData["clientId"] = clientId
        jsonData["applicant"]["firstName"] = firstName
        jsonData["applicant"]["lastName"] = lastName
        jsonData["applicant"]["address"]["street"] = street
        jsonData["applicant"]["address"]["state"] = state
        jsonData["applicant"]["email"] = email
        jsonData["applicant"]["spokenLanguage"] = spokenLanguage
        jsonData["source"] = source
        return jsonData
    }
}