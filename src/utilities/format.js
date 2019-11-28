const numeral = require('numeral');
const moment = require('moment');

module.exports = {
  trim: str => str.replace(' ', ''),
  percentage: num => numeral(num).format('0.00%'),
  percentage1decimal: num => numeral(num).format('0.0%'),
  termRate: (term, rate) => `${term}yr ${rate}%`,
  numberToMoney: num => numeral(num).format('$ 0,0'),
  moneyToNumber: money => numeral(money).value(),
  stringToNumber: str => numeral(str).value(),
  numFormat: num => numeral(num).format('0,0'),
  numFormate2Decimals: num => numeral(num).format('0.00'),
  numFormatNoDecimails: num => numeral(num).format('0'),
  phone: (phone) => {
    if (!phone) return '';
    phone = phone.replace(/\D/g, '').substring(1, 11);
    phone = phone
      .substring(0, 3)
      .concat('-')
      .concat(phone.substring(3, 6))
      .concat('-')
      .concat(phone.substring(6, 10));
    return phone;
  },
  dateFormat: date => moment(date).format('MM-DD-YYYY'),
  dateFormatDot: date => moment(date).format('MM.DD.YYYY'),
  dateFormatReverse: date => moment(date).format('YYYY-MM-DD'),
  capitalizeFirstChar: str => str
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
};
