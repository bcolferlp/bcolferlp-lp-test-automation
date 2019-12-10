// Parse CSV Script
const fs = require("fs");
const csv = require("fast-csv");
async function main(file) {
  let data = [];
  const parsedFile = await new Promise(resolve => {
    fs.createReadStream(file)
      .pipe(csv.parse({ headers: true }))
      .on("data", row => data.push(row))
      .on("end", () => resolve(data));
  });
  return parsedFile;
}

module.exports.main = main;
