const fs = require('fs');
const path = require('path');
const _ = require('underscore');

function getUserHome() {
  // Return local home path
  return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
}
const mainDir = `${getUserHome()}\\Downloads`;
// Return only base file name without dir
function getMostRecentFileName(dir) {
  const files = fs.readdirSync(dir);
  // use underscore for max()
  return _.max(files, function (f) {
    const fullpath = path.join(dir, f);

    // ctime = creation time is used
    // replace with mtime for modification time
    return fs.statSync(fullpath).ctime;
  });
}
function main() {
  // Return and store most recent file
  const recentFile = getMostRecentFileName(mainDir);
  const completePath = path.join(mainDir, recentFile);
  console.log('\x1b[32mNewest File:', completePath, '\x1b[0m');
  return completePath;
}
// Run Main function
module.exports.main = main;
