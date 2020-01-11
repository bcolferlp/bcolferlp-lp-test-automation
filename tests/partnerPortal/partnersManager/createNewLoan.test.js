/* eslint-disable jest/no-identical-title */
/* eslint-disable guard-for-in */
import each from 'jest-each';


import BasePageObject from '../../../base/basePageObject';

const { By } = require('selenium-webdriver');
require('dotenv').config();

export default class PPLoginPage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    // Url
    this.adminURL = process.env.adminURL;
    // Xpath
    this.emailInput = By.xpath('//input[@id ="username"]');
    this.passwordInput = By.xpath('//input[@id ="password"]');
    this.loginBtn = By.xpath('//button[@id ="login-button"]');
    // this.logoutBtn = By.xpath('//a[@title="Logout"]');
    // Values
    this.username = process.env.adminUser;
    this.password = process.env.adminPass;
  }

  async open() {
    await this.openUrl(this.adminURL);
    console.log('Opening URL', this.adminURL);
  }

  async enterEmail(email) {
    if (email) this.username = email;
    const emailInput = await this.findElement(this.emailInput);
    await emailInput.sendKeys(this.username);
    console.log('Email entered');
  }

  async enterPassword(password) {
    if (password) this.password = password;
    const passwordInput = await this.findElement(this.passwordInput);
    await passwordInput.sendKeys(this.password);
    console.log('Password entered');
  }

  async loginClick() {
    const loginBtn = await this.findElement(this.loginBtn);
    await loginBtn.click();
    console.log('Logging in');
  }
}
