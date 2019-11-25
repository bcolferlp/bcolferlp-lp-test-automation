const jsonload = require('jsonload')

export default class TemplateJSON{

    constructor(){
        this.jsonFile = '../../data/loanTemplate.json'
    }

    updateJson(clientId, firstName, lastName, street, email){
        let jsonData = jsonload.sync(this.jsonFile)
        jsonData["clientId"] = clientId
        jsonData["applicant"]["firstName"] = firstName
        jsonData["applicant"]["lastName"] = lastName
        jsonData["applicant"]["address"]["street"] = street
        jsonData["applicant"]["email"] = email
        return jsonData
    }
}