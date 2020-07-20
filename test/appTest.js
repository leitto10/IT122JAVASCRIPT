const expect = require("chai").expect;
const app = require("../data");

describe("data", () => {
    it("returns requested quote", () => {
      const result = app.getQuote(1);
      expect(result).to.deep.equal({
            id: 1,
            quote: "We must accept finite disappointment, but we must never lose infinite hope.",
            author: "Martin Luther King",
            date: "February 6, 1968"
        });
    });
    
    it("fails w/ invalid quote", () => {
      const result = app.getQuote("fake");
      expect(result).to.be.undefined;
    });
   });