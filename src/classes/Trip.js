class Trip {
  constructor(tripInfo) {
    this.id = tripInfo.id;
    this.userID = tripInfo.userID;
    this.destinationID = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = tripInfo.status;
    this.suggestedActivities = tripInfo.suggestedActivities;
  };

  calculateTripCost(destinationData) {
    const destination = destinationData.find(destination => destination.id === this.destinationID);
    const total =
      (this.travelers * destination.estimatedFlightCostPerPerson) +
      (this.travelers * destination.estimatedLodgingCostPerDay)
    return total;
  };
  calculateAgentFee(destinationData) {
    const tripCost = this.calculateTripCost(destinationData);
    const agentFee = (tripCost * .10).toFixed(2);
    return Number(agentFee);
  };

  findDestinationName(destinationData) {
    const destination = destinationData.find(
      (destination) => destination.id === this.destinationID
    );
    const name = destination.destination;
    return name;
  };

};
export default Trip;