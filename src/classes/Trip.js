import DestinationRepository from "./Destination-Repo";

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

  //once we find the id of the destination that matches the id of the trip. then we can calculate the total cost

  calculateTripCost(destinationData){
    const destination = destinationData.find(destination => destination.id === this.destinationID)
    const total =
      (this.travelers * destination.estimatedFlightCostPerPerson) +
      (this.travelers * destination.estimatedLodgingCostPerDay)
    return total
}
calculateAgentFee(destinationData){
  const tripCost = this.calculateTripCost(destinationData)
  const agentFee = (tripCost * .10).toFixed(2) 
  return Number(agentFee)
}

}
export default Trip;