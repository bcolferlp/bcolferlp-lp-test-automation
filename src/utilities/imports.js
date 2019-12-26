// .env
require('dotenv').config();

// LIBRARIES
const fs = require('fs');
const path = require('path');
const { By, until } = require('selenium-webdriver');
const csv = require('fast-csv');
const _ = require('lodash');
// SCRIPTS
const { main: getNewestFile } = require('./getNewestFile');
const { main: parseCSV } = require('./parseCSV');
// SUPPORT
const format = require('./format');

// EXPORTS
module.exports = {
  _,
  fs,
  path,
  getNewestFile,
  format,
  By,
  until,
  csv,
  parseCSV
};
