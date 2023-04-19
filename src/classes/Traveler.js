class Traveler {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.travelerType = data.travelerType;
        this.trips = [];
    }

    findAllTripsByTraveler(tripData) {
        this.trips = tripData.filter(trip => trip.userID === this.id)
    }

}

export default Traveler;