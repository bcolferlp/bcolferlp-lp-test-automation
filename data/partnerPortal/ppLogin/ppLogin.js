module.exports = [
  {
    username: "bad_username@loanpal.com",
    password: "Abcd1234!",
    errorMessage: "The Username or Password are invalid. Please try again!"
  },
  {
    username: "test_manager@loanpal.com",
    password: "bad_password",
    errorMessage: "The Username or Password are invalid. Please try again!"
  },
  {
    username: "test_manager@loanpal.com",
    password: "Abcd####",
    errorMessage: "The Username or Password are invalid. Please try again!"
  }
];
