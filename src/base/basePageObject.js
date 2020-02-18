/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
const { By, until } = require('selenium-webdriver');

export default class BasePageObject {
  constructor(webDriver) {
    this.webDriver = webDriver;
  }

  async openUrl(url) {
    console.log('Opening URL', url);
    await this.webDriver.get(url);
  }

  async close() {
    console.log('Close Driver');
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
    console.log('Getting all handles');
    const handles = await this.webDriver.getAllWindowHandles();
    return handles;
  }

  async switchWindow(handles, index) {
    console.log('Switch Handles');
    await this.webDriver.switchTo().window(handles[index]);
  }

  async refeshPage() {
    await this.webDriver.navigate().refresh();
    console.log('Page refreshed');
  }

  async navTabs(label) {
    console.log('Navigate tabs');
    await this.webDriver.sleep(2000);
    const tab = await this.webDriver.wait(until.elementLocated(By.css(label)), 5000, 'Timeout');
    await tab.click();
  }

  async scrollToBottom() {
    console.log('Scroll to bottom');
    await this.webDriver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await this.webDriver.sleep(2000);
  }

  async scrollToTop() {
    console.log('Scroll to top');
    await this.webDriver.executeScript('window.scrollTo(0, 0)');
    await this.webDriver.sleep(2000);
  }

  async scrollIntoView(element) {
    console.log('Scroll to element');
    await this.webDriver.executeScript('arguments[0].scrollIntoView(true);', element);
  }

  async fullScreen() {
    console.log('Full Screen');
    await this.webDriver
      .manage()
      .window()
      .maximize();
    await this.webDriver.sleep(2000);
  }

  async setZoom(zoom) {
    // Range from 0 to 1
    console.log(`Zoom: ${zoom}`);

    await this.webDriver.executeScript(`document.body.style.zoom=${zoom}`);
  }

  async directClick(element) {
    console.log('Direct Click');
    await this.webDriver.executeScript('arguments[0].click();', element);
  }

  async closeTabs() {
    console.log('Closing Tabs');
    const tabs = await this.webDriver.getAllWindowHandles();
    if (Array.isArray(tabs) && tabs.length > 1) {
      await this.webDriver.switchTo().window(tabs[1]);
      await this.webDriver.close();
      await this.webDriver.switchTo().window(tabs[0]);
    }
  }

  async waitForTarget(locator, count = 0, max = 5) {
    // eslint-disable-next-line no-param-reassign
    count += 1;
    console.log('waitForTarget', locator.value ? locator.value : locator, 'Attempt:', `${count}/${max}`);
    await this.webDriver.sleep(5000);
    try {
      const found = await this.webDriver.findElement(locator);
      if (found) {
        console.log('Load target found');
        return;
      }
    } catch (error) {
      if (count < max) {
        console.log('Searching for element...');
        const targetFile = await this.waitForTarget(locator, count, max);
        return targetFile;
      } else return;
    }
  }

  async waitForTargetRemoval(locator, count = 0, max = 10) {
    // eslint-disable-next-line no-param-reassign
    count += 1;
    console.log('waitForTargetRemoval', locator.value ? locator.value : locator, 'Attempt:', `${count}/${max}`);
    await this.webDriver.sleep(5000);
    try {
      const found = await this.webDriver.findElement(locator);
      if (found && count < max) {
        console.log('Target still exists');
        const targetFile = await this.waitForTargetRemoval(locator, count, max);
        return targetFile;
      }
      return new Error('Target removal timed out');
    } catch (error) {
      console.log('Target is gone');
      return;
    }
  }

  async cellText(tableRows) {
    console.log('Gathering table element text...');
    const tableCells = await Promise.all(
      tableRows.map(async elem => {
        const cells = await elem.findElements(By.tagName('td'));
        const cellTextMap = await Promise.all(
          cells.map(async cell => {
            if (typeof cell.getText() === 'object') {
              const cellText = await cell.getText();
              return cellText;
            }
          })
        );
        return cellTextMap;
      })
    );
    console.log('Gathering complete');
    return tableCells;
  }

  async cellElement(tableRows, tag, returnAll = true) {
    console.log('Gathering table elements...');
    let tableCells;
    if (returnAll) {
      tableCells = await Promise.all(
        tableRows.map(async elem => {
          const cells = await elem.findElements(By.tagName(tag));

          return cells;
        })
      );
      console.log('Gathering complete');
      return tableCells;
    }
    tableCells = await tableRows[0].findElements(By.tagName(tag));

    console.log('Gathering complete');
    return tableCells;
  }

  async waitForURL(url) {
    await this.webDriver.wait(until.urlIs(url), 5000);
    console.log('Url found');
  }

  async executeScript(script) {
    this.webDriver.executeScript(script);
  }

  async enterText(element, string) {
    for (const letter of string) {
      await element.sendKeys(letter);
    }
  }

  async eText(elements, tag) {
    const elementText = await Promise.all(
      elements.map(async e => {
        const tagName = await e.findElement(By.tagName(tag));
        const tagText = await tagName.getText();
        return tagText;
      })
    );
    return elementText;
  }

  async getColumnPosition(headerElements, headerText) {
    let index = 0;
    if (headerElements.length > 0) {
      for (const column in headerElements) {
        if (headerElements[column]) {
          const label = await headerElements[column].getAttribute('textContent');
          if (label === headerText) {
            index = +column + 1;
          }
        }
      }
    }
    return index;
  }
}
