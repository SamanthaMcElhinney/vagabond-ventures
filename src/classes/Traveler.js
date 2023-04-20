const dayjs = require("dayjs");
import Trip from "./Trip";

class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.trips = [];
  }

  findAllTripsByTraveler(tripData) {
    const filteredTrips = tripData.filter((trip) => this.id === trip.userID);
    this.trips = filteredTrips.map((trip) => new Trip(trip));
    return this.trips;
  }

  returnTravelersFirstName() {
    return this.name.split(" ")[0];
  }

  filterTripsByStatus(status) {
    return this.trips.filter((trip) => trip.status === status);
  }

  filterUpcomingTrips(date) {
    return this.trips.filter((trip) => {
      return (
        dayjs(trip.date).format("YYYY/MM/DD") >=
        dayjs(date).format("YYYY/MM/DD")
      );
    });
  }
// Traveler: Calculate Total Spent on Trips by Traveler
//match trip id to destination id
//add total 

}

export default Traveler;