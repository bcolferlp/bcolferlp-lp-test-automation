// .env
require("dotenv").config();

// LIBRARIES
const fs = require("fs");
const path = require("path");

// SCRIPTS
const { main: getNewestFile } = require("./getNewestFile");

// SUPPORT
const format = require("./format");

// EXPORTS
module.exports = {
  fs,
  path,
  getNewestFile,
  format
};
