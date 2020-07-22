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

    it("Deletes a quote", () => {
        const result = app.deleteItemQuote({id:1});
        expect(result).to.deep.equal({
            deleted: true
        });
    });
    it("fails w/ invalid deleted quote", () => {
        const result = app.deleteItemQuote({id:1});
        expect(result.deleted).to.be.false;
    });

    it("Adds a new quote", () => {
       const result = app.addItemQuote({
            quote: "There is no place like home",
            author: "Jose Jose",
            date: "07/18/2020"
       }); 
       expect(result.created).to.be.true;
    });



    it("returns all the quotes", () => {
        const result = app.getAll();
        expect(result).to.deep.equal({
            data: true
    });
    });

    it("fails w/ invalid quotes", () => {
        const result = app.getAll("fake");
        expect(result).to.be.all;
      });




   });