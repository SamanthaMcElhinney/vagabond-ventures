import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/classes/Traveler";
import travelersTestData from "./Travelers-test-data";

describe("Traveler", () => {
    let traveler;

    beforeEach(() => {
        traveler = new Traveler(travelersTestData[0])
    });

    it("should be a new instance of Traveler", () => {
        expect(traveler).to.be.an.instanceOf(Traveler);
    });

    it("should have an id", () => {
        expect(traveler.id).to.equal(1)
    })
    it("should have a name", () => {
        expect(traveler.name).to.equal("Ham Leadbeater");
    })
    it("should have a traveler's type", () => {
        expect(traveler.travelerType).to.equal("relaxer");
    })

});