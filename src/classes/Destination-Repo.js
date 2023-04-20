class DestinationRepository {
    constructor(destinationData){
        this.destinations = destinationData
    };

    findDestinationByName(name){
        const destination = this.destinations.find(destination => destination.destination === name)
        return destination
    }
    //calcualte trip cost..then connect it to the user's trip cost
}

export default DestinationRepository;