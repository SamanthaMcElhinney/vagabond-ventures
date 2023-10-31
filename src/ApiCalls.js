const BASE_URL = "https://travel-tracker-heroku.herokuapp.com/api/v1";

function fetchTravelers() {
  return fetch(`${BASE_URL}/travelers`)
    .then((response) => response.json())
    .then((data) => data.travelers);
}

function fetchAllTrips() {
  return fetch(`${BASE_URL}/trips`)
    .then((response) => response.json())
    .then((data) => data.trips);
}

function fetchAllDestinations() {
  return fetch(`${BASE_URL}/destinations`)
    .then((response) => response.json())
    .then((data) => data.destinations);
}

export { fetchTravelers, fetchAllTrips, fetchAllDestinations };
