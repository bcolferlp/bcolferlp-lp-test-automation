const { By, until } = require("selenium-webdriver");

export default class BasePageObject {
  constructor(webDriver) {
    this.webDriver = webDriver;
  }

  async openUrl(url) {
    console.log("Opengin URL".cyan);
    await this.webDriver.get(url);
  }

  async close() {
    console.log("Close Driver".cyan);
    await this.webDriver.close();
  }

  async sleep(milliseconds) {
    await this.webDriver.sleep(milliseconds);
  }

  async findElement(locator) {
    const elem = await this.webDriver.findElement(locator);
    return elem;
  }

  async findElements(locator) {
    // Return array of elements
    const elem = await this.webDriver.findElements(locator);
    return elem;
  }

  async waitForElementLocated(locator, timeSec) {
    const elem = await this.webDriver.wait(until.elementLocated(locator), timeSec);
    return elem;
  }

  async waitForElementsLocated(locator, timeSec) {
    // wait and Return array of elements
    const elem = await this.webDriver.wait(until.elementsLocated(locator), timeSec);
    return elem;
  }

  async waitForTextContains(locator, textContains, timeSec) {
    const webElem = await this.findElement(locator);
    await this.webDriver.wait(until.elementTextContains(webElem, textContains), timeSec);
  }

  async getTextFromElement(locator) {
    const webElem = await this.findElement(locator);
    const text = await webElem.getText();
    return text;
  }

  async getAllWindowHandles() {
    console.log("Getting all handles".cyan);
    const handles = await this.webDriver.getAllWindowHandles();
    return handles;
  }

  async switchWindow(handles, index) {
    console.log("Switch Handles".cyan);
    await this.webDriver.switchTo().window(handles[index]);
  }

  async refeshPage() {
    await this.webDriver.navigate().refresh();
    console.log("Page refreshed".cyan);
  }

  async navTabs(label) {
    console.log("Navigate tabs".cyan);
    await this.webDriver.sleep(2000);
    const tab = await this.webDriver.wait(until.elementLocated(By.css(label)), 5000, "Timeout");
    await tab.click();
  }

  async scrollToBottom() {
    console.log("Scroll to bottom".cyan);
    await this.webDriver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await this.webDriver.sleep(2000);
  }

  async scrollToTop() {
    console.log("Scroll to top".cyan);
    await this.webDriver.executeScript("window.scrollTo(0, 0)");
    await this.webDriver.sleep(2000);
  }

  async scrollIntoView(element) {
    console.log("Scroll to element");
    await this.webDriver.executeScript("arguments[0].scrollIntoView(true);", element);
  }

  async fullScreen() {
    console.log("Full Screen".cyan);
    await this.webDriver
      .manage()
      .window()
      .maximize();
    await this.webDriver.sleep(2000);
  }

  async setZoom(zoom) {
    // Range from 0 to 1
    console.log(`Zoom: ${zoom}`.cyan);

    await this.webDriver.executeScript(`document.body.style.zoom=${zoom}`);
  }

  async directClick(element) {
    console.log("Direct Click");
    await this.webDriver.executeScript("arguments[0].click();", element);
  }

  async closeTabs() {
    console.log("Closing Tabs".cyan);
    const tabs = await this.webDriver.getAllWindowHandles();
    if (Array.isArray(tabs) && tabs.length > 1) {
      await this.webDriver.switchTo().window(tabs[1]);
      await this.webDriver.close();
      await this.webDriver.switchTo().window(tabs[0]);
    }
  }

  async waitForTarget(locator, count = 0, max = 5) {
    count += 1;
    console.log("waitForTarget", locator.value ? locator.value : locator, "Attempt:", `${count}/${max}`.yellow);
    await this.webDriver.sleep(5000);
    try {
      const found = await this.webDriver.findElement(locator);
      if (found) {
        console.log("Load target found".cyan);
        return;
      }
    } catch (error) {
      if (count < max) {
        console.log("Searching for element...".yellow);
        const targetFile = await this.waitForTarget(locator, count);
        return targetFile;
      } else return;
    }
  }
}
