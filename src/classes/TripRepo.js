const dayjs = require("dayjs");

class TripRepo {
  constructor(tripInfo) {
    this.data = tripInfo;
  };

  findAllTripsByTraveler(id) {
    return this.data.filter((data) => data.userID === id);
  };

  returnPastTrips(id, date) {
    return this.findAllTripsByTraveler(id).filter(
      (trip) =>
      trip.status === 'approved' && (dayjs(trip.date).format("YYYY/MM/DD") <=
        dayjs(date).format("YYYY/MM/DD"))
    );
  };

  returnFutureTrips(id, date) {
    const result = this.findAllTripsByTraveler(id).filter(
      (trip) =>
      trip.status === 'approved' &&
      dayjs(trip.date).format("YYYY/MM/DD") >=
      dayjs(date).format("YYYY/MM/DD")
    );
    return result;
  };

  returnPendingTrips(id) {
    const result = this.findAllTripsByTraveler(id).filter(
      (trip) => trip.status === "pending"
    );
    return result;
  };

  getTripsByStatus(id, status) {
    let travelerTrips = this.getTripsByUserId(id);
    return travelerTrips.filter((trip) => trip.status === status);
  };

  calculateTotalSpentByTraveler(id, destinations) {
    let trips = this.findAllTripsByTraveler(id)
    let total = trips.reduce((acc, trip) => {
      acc += destinations.calculateTotalTripCost(
        trip.destinationID,
        trip.travelers,
        trip.duration
      );
      return acc;
    }, 0);
    return total;
  };
}
;

export default TripRepo;