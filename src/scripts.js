// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// Classes import
import Traveler from './classes/Traveler';
import Trip from './classes/Trip';
import DestinationRepository from './classes/Destination-Repo';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/logo-main.png';
import './images/rainbow.jpg';

//third party library imports
const dayjs = require("dayjs");
console.log(dayjs)

//query selectors:
const pastTripsButton = document.querySelector("#pastTripsButton");
const usersCard = document.querySelector("#cardGrid")
const usersStats = document.querySelector(".navigation-user-card")

let allTrip;
let currentTraveler;
let allDestinations;
let currentTravelerTrips

let date = dayjs().format("YYYY/MM/DD");
console.log(date, "date")
console.log('This is the JavaScript entry file - your code begins here.');

// import API Calls

import {
  fetchTravelers,
  fetchAllTrips,
  fetchAllDestinations
} from './ApiCalls';

Promise.all([fetchTravelers(), fetchAllTrips(), fetchAllDestinations()])
  .then(
    ([travelerData, tripData, destinationData]) => {
      allTrip = tripData
      allDestinations = destinationData
      currentTraveler = new Traveler(travelerData[1]);
      currentTravelerTrips = currentTraveler.findAllTripsByTraveler(allTrip);
      console.log(currentTravelerTrips, "current traveler trips")
      displayUser(currentTraveler);
      renderTotalSpent(currentTraveler, currentTravelerTrips, allDestinations);
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

function renderTotalSpent(
  currentTraveler,
  currentTravelerTrips,
  allDestinations
) {
  usersStats.innerHTML = `<div class="navigation-user-card">
        <h2 class="navigation-user-welcome">Welcome Back </h2>
        <p class="navigation-stats-sent">Here are your stats</p>
        <p class="navigation-stats-invested">You have invested $ ${currentTraveler.calculateTotalSpentByTraveler(
          currentTravelerTrips,
          allDestinations
        )} in your happiness</p>
      </div>`;
}

const renderPastTrips = (currentTraveler, date) => {
  let trips = currentTraveler.filterPastTrips(date)
  usersCard.innerHTML = " "
  trips.forEach((trip) => {
    usersCard.innerHTML += `
    <section class="card-grid" id="cardGrid">
    <section class="card" id="usersCard">
    <h4 card-title></h4>
    <img class="card-holder-img" src="" alt="" alt="">
    <div class=card-text>
    <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
    <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
    <p class="card-duration"><b>Duration: ${trip.duration}</b></p>
    <p class="card-status"><b>Status: ${trip.status}</b></p>
    `;
  })
  
}