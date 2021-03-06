module.exports = {
  adminUtil: 'https://admin-utils.loanpal.com/',
  investorPortal: `https://${process.env.STAGE !== 'prod' ? `${process.env.STAGE}-` : ''}investors.loanpal.com`,
  partnerPortal: `https://${process.env.STAGE !== 'prod' ? `${process.env.STAGE}-` : ''}partner-admin.loanpal.com`,
  underwriterPortal: `https://${process.env.STAGE !== 'prod' ? `${process.env.STAGE}-` : ''}underwriter.loanpal.com`,
  docuSign: `https://${process.env.STAGE === 'prod' ? 'na3' : 'demo'}.docusign.net/restapi/v2/accounts/${
    process.env.STAGE === 'prod' ? '13680956' : '2786952'
  }`,
  loanCreate: `https://${process.env.STAGE !== 'dev' && process.env.STAGE !== 'prod' ? `${process.env.STAGE}-client` : ''}api.loanpal.com/${
    process.env.STAGE
  }/restapi/v1/public/applications/`,
  loanCalc: `https://${process.env.STAGE !== 'dev' && process.env.STAGE !== 'prod' ? `${process.env.STAGE}-client` : ''}api.loanpal.com/${
    process.env.STAGE
  }/restapi/v1/loanCalc`,
  loanApp: `https://${process.env.STAGE !== 'prod' ? `${process.env.STAGE}-` : ''}www.loanpal.com/`
};
