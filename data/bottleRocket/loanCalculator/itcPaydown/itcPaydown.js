module.exports = [
  // If percentage included calculate paydown amount (loanamount * %)
  { loanAmount: 30000, paydownAmount: null, percentage: 0.0299, result: { paydownAmount: 897, percentage: 0.0299 } },
  // if paydownAmount is included and percentage is NOT included, calculate percentage
  { loanAmount: 30000, paydownAmount: 1000, percentage: null, result: { paydownAmount: 897, percentage: 0.033 } },
  // if percentage AND paydownAmount is included, calculate paydownAmount; ignore input paydownAmount
  { loanAmount: 30000, paydownAmount: 1000, percentage: 0.0399, result: { paydownAmount: 897, percentage: 0.0399 } },
  // if neither percentage nor paydownAmount is included, default to current solar ITC and calculate paydownAmount
  { loanAmount: 30000, paydownAmount: null, percentage: null, result: { paydownAmount: 7800, percentage: 0.26 } }
];
