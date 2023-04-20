const dayjs = require("dayjs");

class TravelerRepository {
  constructor(travelersData) {
    this.data = travelersData;
  }

  getSingleTravelerById(id) {
    return this.data.find((traveler) => traveler.id === id);
  }

//   filterTripsByStatus(status) {
//     return this.trips.filter((trip) => trip.status === status);
//   }

//   filterPastTrips(date) {
//     return this.trips.filter((trip) => {
//       return (
//         dayjs(trip.date).format("YYYY/MM/DD") <=
//         dayjs(date).format("YYYY/MM/DD")
//       );
//     });
//   }

//   filterUpcomingTrips(date) {
//     return this.trips.filter((trip) => {
//       return (
//         dayjs(trip.date).format("YYYY/MM/DD") >=
//         dayjs(date).format("YYYY/MM/DD")
//       );
//     });
//   }

//   calculateTotalSpentByTraveler(tripData, destinationData) {
//     let trips = this.findAllTripsByTraveler(tripData);
//     return trips.reduce((acc, trip) => {
//       acc +=
//         trip.calculateAgentFee(destinationData) +
//         trip.calculateTripCost(destinationData);
//       console.log(acc, "acc");
//       return acc;
//     }, 0);
//   }
}

export default TravelerRepository;
