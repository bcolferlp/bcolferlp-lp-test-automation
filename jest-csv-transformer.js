const Papa = require('papaparse');

module.exports = {
  process(fileContent) {
    const parseOptions = {
      header: true,
      skipEmptyLines: true
    };
    const { data } = Papa.parse(fileContent.trim(), parseOptions);
    return `module.exports = ${JSON.stringify(data)};`;
  }
};
