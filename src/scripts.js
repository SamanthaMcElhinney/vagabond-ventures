// Imports
import "./css/styles.css";

// Classes import
import DestinationRepository from "./classes/Destination-Repo";
import TravelerRepository from "./classes/Traveler-Repo";
import Traveler from "./classes/Traveler";
import TripRepo from "./classes/TripRepo";

//Images Import
import "./images/logo-main.png";
import "./images/rainbow.jpg";

//Third Party Library Imports
const dayjs = require("dayjs");

//query selectors:
const pastTripsButton = document.querySelector("#pastTripsButton");
const usersCard = document.querySelector("#cardGrid");
const userWelcomeCard = document.querySelector(".navigation-user-card");
const upcomingTripsButtons = document.querySelector("#upcomingTripsButton");
const pendingTripsButton = document.querySelector("#pendingTripsButton");
const getAQuoteButton = document.querySelector("#estimateButton");
const formStartDate = document.querySelector("#calendarStart");
const formDuration = document.querySelector("#duration-input");
const formNumberTravelers = document.querySelector("#travelersInput");
const formDropdown = document.querySelector("#destinations");
const estimateQuoteSection = document.querySelector("#estimatedQuote");
const errorMessagePost = document.querySelector("#errorMessagePost");
const submitTripButton = document.querySelector("#submitButton");

//Global variables
let allTrips;
let allTravelers;
let allDestinations;
let currentTraveler;
let date = dayjs().format("YYYY/MM/DD");

// import API Calls
import {
  fetchTravelers,
  fetchAllTrips,
  fetchAllDestinations,
} from "./ApiCalls";

Promise.all([fetchTravelers(), fetchAllTrips(), fetchAllDestinations()]).then(
  ([travelerData, tripData, destinationData]) => {
    allTravelers = new TravelerRepository(travelerData)
    allDestinations = new DestinationRepository(destinationData)
    console.log(allDestinations, "AD")
    allTrips = new TripRepo(tripData)
    currentTraveler = new Traveler(allTravelers.getSingleTravelerById(7));
    displayUser(currentTraveler, allDestinations, allTrips);
    createDropdown(allDestinations);
  }
).catch(error => {
  console.log('Error fetching Data:', error.message)
})

//Event Listeners
pastTripsButton.addEventListener("click", () => {
  renderPastTrips(allTrips, currentTraveler, date);
});

upcomingTripsButtons.addEventListener("click", () => {
  renderUpcomingTrips(allTrips, currentTraveler, date);
})

pendingTripsButton.addEventListener("click", () => {
  renderPendingTrips(currentTraveler)
})

getAQuoteButton.addEventListener("click", (event) => {
  displayTripCost(event)
})

const createDropdown = () => {
  allDestinations.data
    .sort((a, b) => {
      return a.destination - b.destination;
    })
    .forEach((destination) => {
      formDropdown.innerHTML += `
    <option value="${destination.destination}">${destination.destination}</option>
    `;
    });
};

const displayTripCost = (event) => {
  event.preventDefault();
  const destination = allDestinations.findDestinationByName(formDropdown.value);
  const total =
    destination.estimatedLodgingCostPerDay * formDuration.value +
    destination.estimatedFlightCostPerPerson * formNumberTravelers.value * 1.1;
  const roundedTotal = Number(total).toFixed(2)
  estimateQuoteSection.classList.remove("hidden")
  estimateQuoteSection.innerText = `$${roundedTotal} for this new trip`
}

const createTrip = (object) => {
  fetch("http://localhost:3001/api/v1/trips", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "content-Type": "application/json",
      },
    })
    .then(response => {
      if (!response.ok || response.status === 422) {
        throw new Error("This is so embarressing, but there is an error with our server. We are working on it!")
      } else if (!response.ok) {
        throw new Error(error)
      }
      return response.json()
    })
    .then((data)=> {
      console.log(data, "data")
      postPendingTrip()
    })
    return fetchAllTrips()
    .then((tripData) => {
          allTrips = new TripRepo(tripData);
    })
    .catch((error) => {
      console.log(error)
      errorMessagePost.innerText =
        "This is so embarressing, but there is an error with our server. We are working on it!";
      clearSearchInputs();
    })
}

submitTripButton.addEventListener("click", function (event) {
  event.preventDefault();
  const destinationId = allDestinations.data.find(
    (destination) => destination.destination === formDropdown.value
  );
  const tripObject = {
    id: Number(allTrips.data.length + 1),
    userID: currentTraveler.id,
    destinationID: Number(destinationId.id),
    travelers: Number(formNumberTravelers.value),
    date: dayjs(formStartDate.value).format("YYYY/MM/DD"),
    duration: Number(formDuration.value),
    status: "pending",
    suggestedActivities: [],
  };
  createTrip(tripObject)
   setTimeout(() => {
     calculateTotalSpent(currentTraveler, allDestinations, allTrips);
   }, 3000);
   clearSearchInputs()
})

const postPendingTrip = () => {
   userWelcomeCard.innerHTML = `  "Groovy! 🪩 Your trip has been requested and is pending. Get excited! You should hear back from an agent shortly."
      <div class="navigation-user-card"></div>`
}

const calculateTotalSpent = (currentTraveler, allDestinations, allTrips) => {
  userWelcomeCard.innerHTML = `
        <h2 class="navigation-user-welcome">Good Choice ${currentTraveler.returnTravelersFirstName()} !</h2>
       <p class="navigation-stats-invested"> You have invested more to your happiness $${allTrips.calculateTotalSpentByTraveler(
         currentTraveler.id,
         allDestinations
       )} </p>
   `;
}
const displayUser = (
  currentTraveler,
  allDestinations,
  allTrips
) => {
  userWelcomeCard.innerHTML = ` <div class="navigation-user-card">
     <h2 class="navigation-user-welcome">Welcome back ${currentTraveler.returnTravelersFirstName()}!</h2>
     <p>I love that you are a ${currentTraveler.travelerType} ✨</p>
     <p class="navigation-stats-sent">Here are your stats:</p>
        <p class="navigation-stats-invested">You have invested $ ${allTrips.calculateTotalSpentByTraveler(
          currentTraveler.id,
          allDestinations
        )} in your happiness</p>
      </div>`;
};

const clearSearchInputs = () => {
  formDropdown.value = "";
  formDuration.value = "";
  formNumberTravelers.value = "";
  formStartDate.value = "";

}

const renderUpcomingTrips = (allTrips, currentTraveler, date) => {
  let trips = allTrips.returnFutureTrips(currentTraveler.id, date)
  if (trips.length === 0) {
    usersCard.innerText = `
       Sorry ${currentTraveler.name}! You don't have any upcoming trips scheduled
       `;
  } else {
    trips.forEach((trip) => {
      usersCard.innerHTML += `
  <section class="card" id="usersCard">
     <p class="card-title">${
       allDestinations.getSingleDestinationById(trip.destinationID).destination
     }</p>
            <img class="card-holder-img" src="${
              allDestinations.getSingleDestinationById(trip.destinationID).image
            }" alt="" alt="">
       <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
       <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
       <p class="card-duration"><b>Duration: ${trip.duration}days</b> </p>
       <p class="card-status"><b>Status: ${trip.status}</b></p>
       `;
    });
  }
}

const renderPastTrips = (allTrips, currentTraveler, date) => {
  let trips = allTrips.returnPastTrips(currentTraveler.id, date);
  usersCard.innerHTML = " ";
  trips.forEach((trip) => {
    console.log(trip.id, "trip")
    usersCard.innerHTML += `
    <section class="card" id="usersCard">
     <p class="card-title">${
       allDestinations.getSingleDestinationById(trip.destinationID).destination
     }</p>
            <img class="card-holder-img" src="${
              allDestinations.getSingleDestinationById(trip.destinationID)
                .image
            }" alt="" alt="">
      <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
      <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
      <p class="card-duration"><b>Duration: ${trip.duration}</b></p>
      <p class="card-status"><b>Status: ${trip.status}</b></p>
      `;
  })
}

const renderPendingTrips = (currentTraveler) => {
  let trips = allTrips.returnPendingTrips(currentTraveler.id);

  if (!allTrips.returnPendingTrips(currentTraveler.id).length) {
    usersCard.innerText = `
    Sorry ${currentTraveler.name}! You don't have any pending trips scheduled
       `;
  } else {
    usersCard.innerHTML = " ";
    trips.forEach((trip) => {
      usersCard.innerHTML += `
        <section class="card" id="usersCard">
     <p class="card-title">${
       allDestinations.getSingleDestinationById(trip.destinationID).destination
     }</p>
            <img class="card-holder-img" src="${
              allDestinations.getSingleDestinationById(trip.destinationID).image
            }" alt="" alt="">
       <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
       <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
       <p class="card-duration"><b>Duration: ${trip.duration} days</b> </p>
       <p class="card-status"><b>Status: ${trip.status}</b></p>
       `;
    });
  }
};