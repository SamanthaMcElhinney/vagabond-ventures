const dayjs = require("dayjs");
import DestinationRepository from "./Destination-Repo";

class TripRepo {
  constructor(tripInfo) {
    this.data = tripInfo;
  }

  findAllTripsByTraveler(id) {
    return this.data.filter((data) => data.userID === id);
  }

  returnPastTrips(id, date) {
    return this.findAllTripsByTraveler(id).filter(
      (trip) =>
        trip.status === 'approved' && (dayjs(trip.date).format("YYYY/MM/DD") <=
        dayjs(date).format("YYYY/MM/DD"))
    );
  }

  // matchTripsToDestinations(destinationData){
  //   let destinations = destinationData.filter(destination => destination.data.id === destination.id)
  //   console.log(destinations, "destinations")
  // }

  // returnPastTripsDestinations(id, date, destinations) {
  //  let trips = this.returnPastTrips(id,date)
  //  console.log(trips, "trips")
  //  let allDestinationsData = trips.filter(
  //    (trip) => trip.destinationID === destinations.id
  //  );
  //  console.log(allDestinationsData, "dest");
  //  return allDestinationsData;
  // }

  returnFutureTrips(id, date) {
    return this.findAllTripsByTraveler(id).filter(
      (trip) =>
      trip.status === 'approved' &&
        dayjs(trip.date).format("YYYY/MM/DD") >=
        dayjs(date).format("YYYY/MM/DD")
    );
  }

  returnPendingTrips(id) {
    const result = this.findAllTripsByTraveler(id).filter(
      (trip) => trip.status === "pending"
    );
    console.log(result);
    return result;
  }
  getTripsByStatus(id, status) {
    let travelerTrips = this.getTripsByUserId(id);
    return travelerTrips.filter((trip) => trip.status === status);
  }
  calculateTotalSpentByTraveler(id, destinations){
    let trips = this.findAllTripsByTraveler(id)
    let total = trips.reduce((acc, trip) => {
      acc += destinations.calculateTotalTripCost(
        trip.destinationID,
        trip.travelers,
        trip.duration
      )
      return acc
    },0)
    return total
  }
}
export default TripRepo;
