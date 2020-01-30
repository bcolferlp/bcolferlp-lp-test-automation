import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

const { _ } = require('../../src/utilities/imports');

let currentUser;

export default class Cognito {
  constructor(config) {
    this.config = config;
  }

  getUserPool(UserPoolId, ClientId) {
    return new CognitoUserPool({
      UserPoolId,
      ClientId
    });
  }

  getCurrentUser() {
    const { UserPoolId, ClientId } = this.config;
    if (currentUser) return currentUser;
    const userPool = this.getUserPool(UserPoolId, ClientId);
    currentUser = userPool.getCurrentUser();
    return currentUser;
  }

  async getToken() {
    const result = await this.login();
    const found = _.find(result, 'jwtToken');
    return found.jwtToken;
  }

  login() {
    const { UserPoolId, ClientId, Username, Password } = this.config;
    const Pool = this.getUserPool(UserPoolId, ClientId);
    const user = new CognitoUser({ Username, Pool });
    const authData = { Username, Password };
    const authDetails = new AuthenticationDetails(authData);
    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
      });
    });
  }
}
