class Traveler {
  constructor(travelerInfo) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
  }

  returnTravelersFirstName() {
    return this.name.split(" ")[0];
  }
}

export default Traveler;
