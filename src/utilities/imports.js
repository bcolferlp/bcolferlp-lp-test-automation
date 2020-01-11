// .env
require('dotenv').config();

// LIBRARIES
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { By, until } = require('selenium-webdriver');
const csv = require('fast-csv');
const _ = require('lodash');
const request = require('request');
// SCRIPTS
const { main: getNewestFile } = require('./getNewestFile');
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
  csv,
  globals,
  urls,
  request
};
