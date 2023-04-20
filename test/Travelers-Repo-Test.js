import chai from "chai";
const expect = chai.expect;
import TravelerRepository from "../src/classes/Traveler-Repo";
import Traveler from "../src/classes/Traveler";
import travelersTestData from "./Travelers-test-data";

describe("TravelerRepository", () => {
  let travelers;

  beforeEach(() => {
    travelers = new TravelerRepository(travelersTestData);
  });

  it("should be a new instance of Traveler", () => {
    expect(travelers).to.be.an.instanceOf(TravelerRepository);
  });

  it("should have a property of data to hold all the traveler's data object", () => {
    expect(travelers.data).to.deep.equal([
  { id: 1, name: 'Ham Leadbeater', travelerType: 'relaxer' },
  { id: 2, name: 'Rachael Vaughten', travelerType: 'thrill-seeker' },
  { id: 3, name: 'Sibby Dawidowitsch', travelerType: 'shopper' },
  { id: 4, name: 'Leila Thebeaud', travelerType: 'photographer' },
  { id: 5, name: 'Tiffy Grout', travelerType: 'thrill-seeker' },
  { id: 6, name: 'Laverna Flawith', travelerType: 'shopper' },
  { id: 7, name: 'Emmet Sandham', travelerType: 'relaxer' },
  { id: 8, name: "Carlin O'Reilly", travelerType: 'history buff' },
  { id: 9, name: 'Natalee Deegin', travelerType: 'relaxer' },
  { id: 10, name: 'Rickie Jodlowski', travelerType: 'relaxer' }
])
  })
  it("should be able to get a single traveler by Id", () => {
    expect(travelers.getSingleTravelerById(7)).to.deep.equal(
      { id: 7, name: 'Emmet Sandham', travelerType: 'relaxer' }
    );
  })

});
