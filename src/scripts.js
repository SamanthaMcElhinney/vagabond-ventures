// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// Classes import
import DestinationRepository from "./classes/Destination-Repo";
import TravelerRepository from "./classes/Traveler-Repo";
import Traveler from "./classes/Traveler";
import TripRepo from "./classes/TripRepo";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/logo-main.png";
import "./images/rainbow.jpg";

//third party library imports
const dayjs = require("dayjs");
console.log(dayjs);

//query selectors:
const pastTripsButton = document.querySelector("#pastTripsButton");
const usersCard = document.querySelector("#cardGrid");
const userWelcomeCard = document.querySelector(".navigation-user-card");
const upcomingTripsButtons = document.querySelector("#upcomingTripsButton");
const pendingTripsButton = document.querySelector("#pendingTripsButton");
const errorHandlingContainer = document.querySelector("#errorHandlingMain");
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
console.log(date, "date");

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

//event listeners
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

//  submitTripButton.addEventListener("click", (event) => {
//   postIt(event)
//  })

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
  console.log(currentTraveler.id, "CD")
  const destination = allDestinations.findDestinationByName(formDropdown.value);
  console.log(destination, "destination")
  const total =
    destination.estimatedLodgingCostPerDay * formDuration.value +
    destination.estimatedFlightCostPerPerson * formNumberTravelers.value * 1.1;
  const roundedTotal = Number(total).toFixed(2)
  console.log(formDuration.value, "duration");
  console.log(formNumberTravelers.value, "number travelers");
  estimateQuoteSection.classList.remove("hidden")
  estimateQuoteSection.innerText = `$${roundedTotal} for this new trip`
  // estimateQuoteSection.style.backgroundColor = "white"
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
      if(!response.ok && response.status === 422) {
        throw new Error("yo it's not working")
      } else if (!response.ok){
        throw new Error(error)
      }
      return response.json()
    })
    .catch(error => console.error(error))
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
  calculateTotalSpent(currentTraveler, allDestinations, allTrips); 
      console.log(tripObject)
      console.log(allTrips, "All trips")
    })


// const postIt = (event) => {
//     event.preventDefault()
//     if (formDropdown.value, formDuration.value, formNumberTravelers.value) {
//       const destinationId = allDestinations.data.find(destination => destination.destination === formDropdown.value);
//       fetch("http://localhost:3001/api/v1/trips", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: allTrips.length + 1,
//           userID: currentTraveler.id,
//           destinationID: Number(destinationId.id),
//           travelers: Number(formNumberTravelers.value),
//           date: dayjs(formStartDate.value).format("YYYY/MM/DD"),
//           duration: formDuration.value,
//           status: "pending",
//           suggestedActivities: [],
//         }),
//       })
//       .then(response => {
//           // if (!response.ok || response.status >= 400) {
//           //   throw new Error();
//           // } else {
//             response.json();
//             console.log(response, "response")
//             fetchAllTrips()
//             fetchTravelers()
//             .then((trips, travelers) => {
//               trips = new TripRepo(trips); 
//               allTravelers = new TravelerRepository(travelers);
//               allTrips = new TripRepo(tripData);
//               errorMessagePost.remove("hidden");
//               // estimateQuoteSection.add("hidden");
//               errorMessagePost.innerText =
//                 "Groovy! 🪩 Your trip has been requested and is pending. Get excited! You should hear back from an agent shortly.";
//               clearSearchInputs();
//             })
//           })
//     }
//   }


    const calculateTotalSpent = (currentTraveler, allDestinations, allTrips) => {
       userWelcomeCard.innerHTML = ` 
      <div class="navigation-user-card"></div>
       <p class="navigation-stats-invested">You have invested $ ${allTrips.calculateTotalSpentByTraveler(
         currentTraveler.id,
         allDestinations
       )} in your happiness</p>
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