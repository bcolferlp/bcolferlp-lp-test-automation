module.exports = {
  newUserFrom: [
    /Hi harmony\.test\+[0-9]*@testemail\.loanpal\.com,$/,
    '',
    /Your admin has created a user account for you on the Loanpal Partner Portal\.$/,
    /Please use the link and login information below to complete the account set-up\.$/,
    '',
    /Link: https:\/\/dev-partner-admin\.loanpal\.com$/,
    /Username: harmony\.test\+[0-9]*@testemail\.loanpal\.com$/,
    /Password: .*$/,
    '',
    /You will be asked to create a new password when you first login\.$/,
    /If you have trouble logging in your temporary password may have expired\. Please contact your admin to have a new temporary password email sent\.$/,
    '',
    '',
    /Best Regards,$/, 
    '',
    /The Loanpal Team$/,
  ],
  todo: []
};
