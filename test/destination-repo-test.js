import chai from "chai";
const expect = chai.expect;
import destinationTestData from "./destinationTestData";
import DestinationRepository from "../src/classes/Destination-Repo";


describe("DestinationRepository", () => {
  let destinations;

  beforeEach(() => {
    destinations = new DestinationRepository(destinationTestData);
  });

  it("should be a new instance of Traveler", () => {
    expect(destinations).to.be.an.instanceOf(DestinationRepository);
  });

  it("should have a property of data to hold all the destinations's", () => {
    expect(destinations.data).to.deep.equal([
      {
        id: 49,
        destination: "Castries, St Lucia",
        estimatedLodgingCostPerDay: 650,
        estimatedFlightCostPerPerson: 90,
        image:
          "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        alt: "aerial photography of rocky mountain under cloudy sky",
      },
      {
        id: 25,
        destination: "New York, New York",
        estimatedLodgingCostPerDay: 175,
        estimatedFlightCostPerPerson: 200,
        image:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "people crossing the street during the day surrounded by tall buildings and advertisements",
      },
      {
        id: 22,
        destination: "Rome, Italy",
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 650,
        image:
          "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "people standing inside a colosseum during the day",
      },
      {
        id: 14,
        destination: "Marrakesh, Morocco",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 830,
        image:
          "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        alt: "people buying oranges and other fruit from a street vendor",
      },
      {
        id: 29,
        destination: "Willemstad, Curaçao",
        estimatedLodgingCostPerDay: 80,
        estimatedFlightCostPerPerson: 1100,
        image:
          "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
        alt: "brightly colored buildings near body of water",
      },
      {
        id: 35,
        destination: "Anchorage, Alaska",
        estimatedLodgingCostPerDay: 200,
        estimatedFlightCostPerPerson: 100,
        image:
          "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "man riding on kayak surrounded by mountains",
      },
      {
        id: 17,
        destination: "Jaipur, India",
        estimatedLodgingCostPerDay: 30,
        estimatedFlightCostPerPerson: 1200,
        image:
          "https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "a courtyard with trees and mountain in the distance",
      },
    ]);
  });
  it("should be able to get single destination by id", () => {
    expect(
      destinations.getSingleDestinationById(17)).to.deep.equal({
        id: 17,
        destination: "Jaipur, India",
        estimatedLodgingCostPerDay: 30,
        estimatedFlightCostPerPerson: 1200,
        image:
          "https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "a courtyard with trees and mountain in the distance",
      })
  })

  it("should be able to find destination by name", () => {
    expect(
      destinations.findDestinationByName("Willemstad, Curaçao")
    ).to.deep.equal({id: 29,
        destination: "Willemstad, Curaçao",
        estimatedLodgingCostPerDay: 80,
        estimatedFlightCostPerPerson: 1100,
        image:
          "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
        alt: "brightly colored buildings near body of water"
  })
})
  it("should be able to calculate total trip bcost", () => {
    expect(destinations.calculateTotalTripCost(29, 1, 2)).to.equal(1386)
  })
});
