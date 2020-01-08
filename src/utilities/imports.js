// .env
require('dotenv').config();

// LIBRARIES
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { By, until } = require('selenium-webdriver');
const csv = require('fast-csv');
const _ = require('lodash');
// SCRIPTS
const { main: getNewestFile } = require('./getNewestFile');
const { main: parseCSV } = require('./parseCSV');
const { main: auroraQuery } = require('./aurora');
// SUPPORT
const format = require('./format');
const globals = require('./globals');
// EXPORTS
module.exports = {
  _,
  AWS,
  fs,
  path,
  getNewestFile,
  format,
  By,
  until,
  csv,
  parseCSV,
  globals,
  auroraQuery
};
