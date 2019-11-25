require("../env");
const { baseClient } = require("@loanpal/lp-e2e-loans/lib/client/client.data");
const { getSingleMilestoneClient } = require("@loanpal/lp-e2e-loans/lib/client/clients");

describe("e2e", () => {
  it.only("create loan", async () => {
    const x = await getSingleMilestoneClient();

    console.log(`clientId: ${x.id}  name: ${x.name}`);
  }, 10000);
});
