const fs = require('fs');
const pdf = require('pdf-parse');

export default class ParsePDF {
  constructor(file) {
    this.file = file;
  }

  parsePDF() {
    const dataBuffer = fs.readFileSync(this.file);
    return pdf(dataBuffer);
  }

  async getPdfText() {
    const result = await this.parsePDF();
    return result.text;
  }

  async getNumberOfPages() {
    const result = await this.parsePDF();
    return result.numpages;
  }

  async getNumberOfRenderedPages() {
    const result = await this.parsePDF();
    return result.numrender;
  }

  async getPdfInfo() {
    const result = await this.parsePDF();
    return result.info;
  }

  async getPdfMetadata() {
    const result = await this.parsePDF();
    return result.metadata;
  }

  async getPdfJsVersion() {
    // check https://mozilla.github.io/pdf.js/getting_started/
    const result = await this.parsePDF();
    return result.version;
  }
}
