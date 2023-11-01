const BASE_URL = "https://travel-tracker-heroku-20221b185f69.herokuapp.com";

function fetchTravelers() {
  return fetch(`${BASE_URL}/travelers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.travelers)
    .catch((error) => {
      console.error("Fetching travelers failed:", error);
    });
}

function fetchAllTrips() {
  return fetch(`${BASE_URL}/trips`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.trips)
    .catch((error) => {
      console.error("Fetching all trips failed:", error);
    });
}

function fetchAllDestinations() {
  return fetch(`${BASE_URL}/destinations`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.destinations)
    .catch((error) => {
      console.error("Fetching all destinations failed:", error);
    });
}
export { fetchTravelers, fetchAllTrips, fetchAllDestinations };
