import chai from "chai";
const expect = chai.expect;

import tripData from "./Trip-test-data";
import TripRepo from "../src/classes/TripRepo";
import DestinationRepository from "../src/classes/Destination-Repo";
import destinationTestData from "./destinationTestData";

describe("Trip", () => {
    let trip, destinationRepository;

    beforeEach(() => {
        trip = new TripRepo(tripData)
        destinationRepository = new DestinationRepository(destinationTestData);
    });

    it("should be a new instance of Trip", () => {
        expect(trip).to.be.an.instanceOf(TripRepo);
    });

    it("should have a data property that holds all the data for all the trips", () => {
        expect(trip.data).to.deep.equal([{
                id: 1,
                userID: 44,
                destinationID: 49,
                travelers: 1,
                date: "2022/09/16",
                duration: 8,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 2,
                userID: 35,
                destinationID: 25,
                travelers: 5,
                date: "2022/10/04",
                duration: 18,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 3,
                userID: 3,
                destinationID: 22,
                travelers: 4,
                date: "2022/05/22",
                duration: 17,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 4,
                userID: 43,
                destinationID: 14,
                travelers: 2,
                date: "2022/02/25",
                duration: 10,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 5,
                userID: 42,
                destinationID: 29,
                travelers: 3,
                date: "2022/04/30",
                duration: 18,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 6,
                userID: 29,
                destinationID: 35,
                travelers: 3,
                date: "2022/06/29",
                duration: 9,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 7,
                userID: 37,
                destinationID: 17,
                travelers: 5,
                date: "2022/5/28",
                duration: 20,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 8,
                userID: 36,
                destinationID: 39,
                travelers: 6,
                date: "2022/02/07",
                duration: 4,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 9,
                userID: 24,
                destinationID: 19,
                travelers: 5,
                date: "2022/12/19",
                duration: 19,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 10,
                userID: 9,
                destinationID: 50,
                travelers: 6,
                date: "2022/07/23",
                duration: 17,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 76,
                userID: 7,
                destinationID: 17,
                travelers: 5,
                date: "2019/10/22",
                duration: 20,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 77,
                userID: 7,
                destinationID: 46,
                travelers: 5,
                date: "2020/05/28",
                duration: 17,
                status: "approved",
                suggestedActivities: [],
            },
        ]);
    });
    it("should store an array of all the trip objects", () => {
        expect(trip.data[1]).to.deep.equal({
            id: 2,
            userID: 35,
            destinationID: 25,
            travelers: 5,
            date: "2022/10/04",
            duration: 18,
            status: "approved",
            suggestedActivities: []
        });
    });
    it("should be able to find all trips associated with a traveler by their id", () => {
        expect(trip.findAllTripsByTraveler(3)).to.deep.equal([{
          id: 3,
          userID: 3,
          destinationID: 22,
          travelers: 4,
          date: "2022/05/22",
          duration: 17,
          status: "approved",
          suggestedActivities: [],
        }]);
    });
    it("should be able to find all past trips taken by a traveler", () => {
        expect(trip.returnPastTrips(7, "2023/05/22")).to.deep.equal([
          {
            id: 76,
            userID: 7,
            destinationID: 17,
            travelers: 5,
            date: "2019/10/22",
            duration: 20,
            status: "approved",
            suggestedActivities: [],
          },
          {
            id: 77,
            userID: 7,
            destinationID: 46,
            travelers: 5,
            date: "2020/05/28",
            duration: 17,
            status: "approved",
            suggestedActivities: [],
          },
        ]);
    })
    it("should return an empty array if there are no upcoming trips", () => {
         expect(trip.returnFutureTrips(7, "2023/05/22")).to.deep.equal([])
    })
    it("should be able to return all matching destination to trips", () => {
        expect(trip.matchTripsToDestinations(destinationRepository)).to.deep.equal()
    })
    it("shoulde be able to filter pending trips", () => {
        expect(trip.returnPendingTrips(7)).to.have.a.lengthOf(0)
    })
    it("should be able to calculate total spent by traveler", () => {
        expect(
          trip.calculateTotalSpentByTraveler(3, destinationRepository)
        ).to.equal(4543);
    })
});