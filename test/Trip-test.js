import chai from "chai";
const expect = chai.expect;

import tripData from "./Trip-test-data";
import Trip from "../src/classes/Trip";
import DestinationRepository from "../src/classes/Destination-Repo";
import destinationTestData from "./destinationTestData";

describe("Trip", () => {
    let trip, destinationRepository;

    beforeEach(() => {
        trip = new Trip(tripData[0])
        destinationRepository = new DestinationRepository(destinationTestData);
    });

    it("should be a new instance of Traveler", () => {
        expect(trip).to.be.an.instanceOf(Trip);
    });

    it("should have an id", () => {
        expect(trip.id).to.equal(1);
    });
    it("should have a user's id", () => {
        expect(trip.userID).to.equal(44);
    });
    it("should have a destination id", () => {
        expect(trip.destinationID).to.equal(49);
    });
    it("should have information on the travelers", () => {
        expect(trip.travelers).to.equal(1);
    });
    it("should have a date associated with the trip", () => {
        expect(trip.date).to.equal("2022/09/16");
    });
    it("should have a duration of the trip", () => {
        expect(trip.duration).to.equal(8);
    });
    it("should have a trip status", () => {
        expect(trip.status).to.equal("approved");
    });
    it("should have suggested activities associated with the trip", () => {
        expect(trip.suggestedActivities).to.deep.equal([]);
    });
    it("should be able to calculate the trip cost", () => {
        expect(trip.calculateTripCost(destinationTestData)).to.equal(740);
    });
    it("should be able to calculate the agent Fee", () => {
        expect(trip.calculateAgentFee(destinationTestData)).to.equal(74);
    });
    it("should find the destination by name", () => {
        expect(trip.findDestinationName(destinationTestData)).to.equal(
            "Castries, St Lucia"
        );
    });
});