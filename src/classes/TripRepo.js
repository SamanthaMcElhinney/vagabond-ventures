const dayjs = require("dayjs");

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
        dayjs(trip.date).format("YYYY/MM/DD") <=
        dayjs(date).format("YYYY/MM/DD")
    );
  }

  returnFutureTrips(id, date) {
    const results = this.findAllTripsByTraveler(id).filter(
      (trip) =>
        dayjs(trip.date).format("YYYY/MM/DD") >=
        dayjs(date).format("YYYY/MM/DD")
    )
    if (results.length === 0) {
      return "Sorry Friend! You don't have any upcoming trips"
    }
  }

  returnPendingTrips(id) {
    const result = this.findAllTripsByTraveler(id).filter(trip => trip.status === 'pending')
    console.log(result)
    return result
  }
  
}
export default TripRepo;
