class Traveler {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.travelerType = data.travelerType;
        this.trips = []
    }

    findAllTripsByTraveler(tripsData) {
        return this.trips = tripsData.filter(trip => this.id === trip.userID)
    }

    returnTravelersFirstName(){
        return this.name.split(" ")[0]
    }

    // calculateTotalCost(tripsData, destinationData) {
    //     this.findAllTripsByTraveler(tripsData)
    // }

}

export default Traveler;