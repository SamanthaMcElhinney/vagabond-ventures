class TravelerRepository {
  constructor(travelersData) {
    this.data = travelersData;
  }

  getSingleTravelerById(id) {
    return this.data.find((traveler) => traveler.id === id);
  }
}

export default TravelerRepository;
