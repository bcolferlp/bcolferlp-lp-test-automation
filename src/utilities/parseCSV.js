// Parse CSV Script
const fs = require('fs');
const csvParser = require('fast-csv');

export default class CSVParser {
  constructor(file = '') {
    this.file = file;
  }

  async parseFile() {
    const data = [];
    const readCSVData = await new Promise(resolve => {
      fs.createReadStream(this.file)
        .pipe(csvParser.parse({ headers: true }))
        .on('data', row => data.push(row))
        .on('end', () => resolve(data));
    });
    return readCSVData;
  }

  async getNumberRows() {
    const rows = await this.parseFile();
    return rows.length;
  }

  async getHeaders() {
    const rows = await this.parseFile();
    return rows[0];
  }

  getCsvHeaders(fileBufferString) {
    return new Promise(resolve => {
      const rows = [];
      const csvStream = csvParser.parseString(fileBufferString);
      const onData = function(row) {
        rows.push(row);
        if (rows.length === 1) {
          csvStream.emit('donereading'); // custom event for convenience
        }
      };
      csvStream.on('data', onData).on('donereading', function() {
        csvStream.removeListener('data', onData);
        return resolve(rows[0]);
      });
    });
  }
}
