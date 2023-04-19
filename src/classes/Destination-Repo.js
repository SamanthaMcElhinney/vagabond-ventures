class DestinationRepository {
    constructor(destinationData, tripData){
        this.destinations = destinationData
        this.trips = tripData
    };

    findDestinationById(id) {
        const destination = this.destinations.find(destination => destination.id === id)
        return destination
    }

    findDestinationByName(name){
        const destination = this.destinations.find(destination => destination.destination === name)
        return destination
    }
    //calcualte trip cost..then connect it to the user's trip cost
}

export default DestinationRepository;