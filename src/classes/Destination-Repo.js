class DestinationRepository {
  constructor(destinationData) {
    this.data = destinationData;
  }

  findMatchingTripToDestination(id) {
    const tripData = this.data.filter((destination) => id === destination.id);
    console.log(tripData);
    return tripData;
  }

  getSingleDestinationById(id) {
    return this.data.find((destination) => destination.id === id);
  }

  findDestinationByName(name) {
    const destination = this.data.find(
      (destination) => destination.destination === name
    );
    if (!destination) {
      return "Sorry no such destination";
    } else {
      return destination;
    }
  }

  calculateTotalTripCost(id, travelers, duration) {
    let destination = this.getSingleDestinationById(id);
    let totalCost =
      destination.estimatedLodgingCostPerDay * duration +
      destination.estimatedFlightCostPerPerson * travelers;
    return Number((totalCost * 1.1).toFixed(2));
  }
}

export default DestinationRepository;