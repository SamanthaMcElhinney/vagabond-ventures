import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/classes/Traveler";
import travelersTestData from "./Travelers-test-data";
import tripData from "./Trip-test-data";
import destinationTestData from "./destinationTestData";

describe("Traveler", () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(travelersTestData[6])
  });

  it("should be a new instance of Traveler", () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it("should have an id", () => {
    expect(traveler.id).to.equal(7)
  })
  it("should have a name", () => {
    expect(traveler.name).to.equal("Emmet Sandham");
  })
  it("should have a traveler's type", () => {
    expect(traveler.travelerType).to.equal("relaxer");
  })
  it("should have a trips property that starts as an empty array", () => {
    expect(traveler.trips).to.deep.equal([])
  })

  it("should be able to find all the trips by a traveler", () => {
    expect(traveler.findAllTripsByTraveler(tripData)).to.deep.equal([{
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
  it("should be able to return just the first name of the traveler", () => {
    expect(traveler.returnTravelersFirstName()).to.equal('Emmet')
  })
  it("should be able to filter trip by status", () => {
    traveler.findAllTripsByTraveler(tripData);
    expect(
      traveler.filterTripsByStatus("approved")
    ).to.deep.equal([{
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
  it("should be able to filter upcoming trips", () => {
    traveler.findAllTripsByTraveler(tripData);
    expect(traveler.filterUpcomingTrips("2019/11/29")).to.deep.equal([{
      id: 77,
      userID: 7,
      destinationID: 46,
      travelers: 5,
      date: "2020/05/28",
      duration: 17,
      status: "approved",
      suggestedActivities: [],
    }, ]);
  })
  it("should be able to calculate the total spent by a traveler", () => {
    expect(
      traveler.calculateTotalSpentByTraveler(destinationTestData)).to.equal();
  });

});