// IP-265
const { parseCSV, path } = require("../src/utilities/imports");
const reviewFile = path.join(__dirname, "../data/files/preSaleReview/only-installed.csv");
const esFile = require("../data/files/preSaleReview/elasticSearch.json");
describe("Pre Sale Review File", () => {
  test("Validate the file filters out loans that are not installed", async done => {
    const {
      hits: { hits: test }
    } = esFile;
    const csv = await parseCSV(reviewFile);
    csv.forEach(row => {
      const { LoanID } = row;
      expect(test).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: LoanID
          })
        ])
      );
      console.log("LoanID found:", LoanID);
    });
    done();
  });
});
