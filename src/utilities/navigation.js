const { until, By } = require("selenium-webdriver");

module.exports = {
  async navTabs(driver, label) {
    await driver.sleep(2000);
    const tab = await driver.wait(until.elementLocated(By.css(label)), 5000, "Timeout");
    await tab.click();
  },
  async scrollToBottom(driver) {
    console.log("Scroll to bottom");
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await driver.sleep(2000);
  },
  async scrollToTop(driver) {
    console.log("Scroll to top");
    await driver.executeScript("window.scrollTo(0, 0)");
    await driver.sleep(2000);
  },
  async fullScreen(driver) {
    await driver
      .manage()
      .window()
      .maximize();
    await driver.sleep(2000);
  },
  async setZoom(driver, zoom) {
    // Range from 0 to 1
    console.log(`Zoom: ${zoom}`);

    await driver.executeScript(`document.body.style.zoom=${zoom}`);
  },
  async waitForTarget(driver, locator, count = 0) {
    // let result = false;
    const max = 5;
    count += 1;
    console.log("waitForTarget", locator.value ? locator.value : locator, "Attempt:", `${count}/${max}`);
    await driver.sleep(5000);
    try {
      const found = await driver.findElement(locator);
      if (found) {
        console.log("Load target found");
        return;
      }
    } catch (error) {
      if (count < max) {
        console.log("Searching for element...");
        const targetFile = await this.waitForTarget(driver, locator, count);
        return targetFile;
      } else return;
    }
  },
  async closeTabs(driver) {
    const tabs = await driver.getAllWindowHandles();
    if (Array.isArray(tabs) && tabs.length > 1) {
      await driver.switchTo().window(tabs[1]);
      await driver.close();
      await driver.switchTo().window(tabs[0]);
    }
  }
};
