import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/classes/Traveler";
import travelersTestData from "./Travelers-test-data";

describe("Traveler", () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(travelersTestData[6]);
  });

  it("should be a new instance of Traveler", () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should have an id", () => {
    expect(traveler.id).to.equal(7);
  });

  it("should have a name", () => {
    expect(traveler.name).to.equal("Emmet Sandham");
  });

  it("should have a traveler's type", () => {
    expect(traveler.travelerType).to.equal("relaxer");
  });

  it("should be able to return just the first name of the traveler", () => {
    expect(traveler.returnTravelersFirstName()).to.equal('Emmet');
  });

});