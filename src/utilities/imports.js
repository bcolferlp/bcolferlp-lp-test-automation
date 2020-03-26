// .env
require('dotenv').config();

// LIBRARIES
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { By, until, Key, error } = require('selenium-webdriver');
const csv = require('fast-csv');
const _ = require('lodash');
const request = require('request');
const logUpdate = require('log-update');
// SCRIPTS
const { main: getNewestFile } = require('./getNewestFile');
const { main: parseCSV } = require('./parseCSV');
const { main: getRandomNum } = require('./getRandomNum');
// SUPPORT
const format = require('./format');
const globals = require('./globals');
const urls = require('./urls');
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
  Key,
  csv,
  globals,
  urls,
  request,
  logUpdate,
  error,
  parseCSV,
  getRandomNum
};
