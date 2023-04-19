function fetchTravelers() {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then((response) => response.json())
    .then((data) => data.travelers);
}

function fetchAllTrips() {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((response) => response.json())
    .then((data) => data.trips);
}

function fetchAllDestinations() {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => response.json())
    .then((data) => data.destinations);
}

export {fetchTravelers, fetchAllTrips, fetchAllDestinations}