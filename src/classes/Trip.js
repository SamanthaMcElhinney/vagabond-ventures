class Trip {
  constructor(tripInfo) {
    this.tripID = tripInfo.id;
    this.travelerID = tripInfo.userID;
    this.destinationID = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = tripInfo.status;
    this.suggestedActivities = tripInfo.suggestedActivities;
  };

  calculateTripCost(){
    
  }
}

export default Trip;
