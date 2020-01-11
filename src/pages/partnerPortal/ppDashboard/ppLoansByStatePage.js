import BasePageObject from "../../../base/basePageObject";
const { By, until } = require("selenium-webDriver");

export default class LoansbyStatePage extends BasePageObject {
  constructor(webDriver) {
    super(webDriver);
    this.loansByStateTable = By.xpath('//table[contains(@class,"__qa_table_stateLoansPercentage")]/tbody/tr');
    this.topTenStatesHeader = By.xpath('//h3[@class="statcard-number"]');
    this.loansByStateSection = By.xpath('//section[@class="__qa_section_loansByState"]');
  }
  async getStateTable() {
    // Store table element
    const loansByStateSection = await this.waitForElementLocated(this.loansByStateSection, 5000);
    // Scroll window to element
    this.scrollIntoView(loansByStateSection);
    const stateTable = await this.waitForElementsLocated(this.loansByStateTable, 20000);
    console.log(`${stateTable.length} States Found`);
    // Process and store state name and loan amounts
    const stateNames = await Promise.all(
      stateTable.map(async elem => {
        const cell = await elem.findElements(By.tagName("td"));
        const stateText = await cell[0].getAttribute("textContent");
        const loanNum = await cell[1].getAttribute("textContent");
        return { stateText, loanNum };
      })
    );
    return stateNames;
    // console.log(`${stateNames}`);
  }
  async verifyStates(stateNames) {
    // Determines what value to divide by based on state
    const oddShapeStates = {
      Florida: 4,
      Louisiana: -8,
      Michigan: 4,
      Hawaii: 0
    };
    // Determines which state names will need empty spaces replaced with \\ character
    const statesWithSpace = [
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "West Virginia"
    ];
    // eslint-disable-next-line prefer-const
    const validatedState = [];
    for (let { stateText, loanNum } of stateNames) {
      const headerVerify = `${stateText}: ${loanNum}`;
      // Hawaii svg is excluded due to the clickable object being too small
      if (!Object.keys(oddShapeStates).includes(stateText)) {
        // if (statesWithSpace.includes(stateText)) stateText = stateText.replace(' ', '\\ ');
        const stateElem = await this.waitForElementLocated(By.xpath(`//*[@id="${stateText}"]`), 5000);
        const size = await stateElem.getRect();
        // eslint-disable-next-line no-prototype-builtins
        if (oddShapeStates.hasOwnProperty(stateText)) {
          console.log("Odd Shape", size);
          const actions = this.webDriver.actions({ async: true });
          const mouse = actions.mouse();
          // Initialize selenium action
          actions
            .pause(mouse)
            .move({
              duration: 100,
              origin: stateElem,
              x: parseInt(size.width / oddShapeStates[stateText], 10),
              y: 0
            })
            .press()
            .release();
          await actions.perform();
          console.log("Move Mouse");
        } else await stateElem.click();
        // await stateElem.click();

        await this.webDriver.sleep(500);
        const stateHeader = await this.waitForElementLocated(this.topTenStatesHeader, 5000);

        const stateHeaderText = await stateHeader.getAttribute("textContent");

        validatedState.push({
          stateHeaderText,
          headerVerify
        });
      }
    }
    return validatedState;
  }
}
