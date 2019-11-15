const fs = require("fs")
const pdf = require("pdf-parse")

export default class ParsePDF{

    constructor(file){
        this.file = file
    }

     parsePDF() {
        let dataBuffer = fs.readFileSync(this.file);
        return pdf(dataBuffer);         
      }

     async getPdfText(){
        let result = await this.parsePDF()
        return result.text
    }

    async getNumberOfPages(){
        let result = await this.parsePDF()
        return result.numpages
    }

    async getNumberOfRenderedPages(){
        let result = await this.parsePDF()
        return result.numrender
    }

    async getPdfInfo(){
        let result = await this.parsePDF()
        return result.info
    }

    async getPdfMetadata(){
        let result = await this.parsePDF()
        return result.metadata
    }

    async getPdfJsVersion(){
        // check https://mozilla.github.io/pdf.js/getting_started/
        let result = await this.parsePDF()
        return result.version
    }

}