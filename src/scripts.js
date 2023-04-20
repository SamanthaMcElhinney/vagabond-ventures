// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// Classes import
import Traveler from './classes/Traveler';
import Trip from './classes/Trip';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/logo-main.png';
import './images/rainbow.jpg';

//third party library imports
const dayjs = require("dayjs");
console.log(dayjs)

//query selectors:
const pastTripsButton = document.querySelector("#pastTripsButton");
const usersCard = document.querySelector("#usersCard")

let allTrip;
let currentTraveler;
let allDestinations;

let date = dayjs("2020/03/01").format("YYYY/MM/DD");
console.log(date, "date")
console.log('This is the JavaScript entry file - your code begins here.');

// import API Calls

import {
  fetchTravelers,
  fetchAllTrips,
  fetchAllDestinations
} from './ApiCalls';
import DestinationRepository from './classes/Destination-Repo';

Promise.all([fetchTravelers(), fetchAllTrips(), fetchAllDestinations()])
  .then(
    ([travelerData, tripData, destinationData]) => {
      allTrip = tripData
      allDestinations = new DestinationRepository(destinationData)
      console.log(allDestinations, "allDest")
      currentTraveler = new Traveler(travelerData[1]);
      currentTraveler.findAllTripsByTraveler(allTrip)
      displayUser(currentTraveler);
    }
  );

const displayUser = (currentTraveler) => {
  const userCard = document.querySelector(".navigation-user-card");
  userCard.innerHTML = ` 
     <h2 class="navigation-user-welcome">Welcome Back ${currentTraveler.name}, you crazy ${currentTraveler.travelerType}</h2>
      <p class="navigation-stats-sent">Here are your stats</p>`;
}

pastTripsButton.addEventListener("click", () => {
  renderPastTrips(currentTraveler, date);
})

const renderPastTrips = (currentTraveler, date) => {
  let trips = currentTraveler.filterPastTrips(date)
  usersCard.innerHTML = " "
  trips.forEach((trip)=> {
    usersCard.innerHTML += `
     <h4 card-title></h4>
            <img class="card-holder-img" src="" alt="" alt="">
            <div class=card-text>
              <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
              <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
              <p class="card-duration"><b>Duration: ${trip.duration}</b></p>
              <p class="card-status"><b>Status: ${trip.status}</b></p>
    `;
  })
};