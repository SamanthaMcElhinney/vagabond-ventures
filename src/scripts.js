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
const usersStats = document.querySelector(".navigation-user-card");
const userCard = document.querySelector(".navigation-user-card");

//Global variables
let allTrips;
let allTravelers;
let allDestinations;
let currentTraveler;

let date = dayjs().format("YYYY/MM/DD");
console.log(date, "date");
console.log("This is the JavaScript entry file - your code begins here.");

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
    allTrips = new TripRepo(tripData)
    currentTraveler = new Traveler(allTravelers.getSingleTravelerById(2));
    displayUser(currentTraveler, allDestinations, allTrips);
  }
);

const displayUser = (
  currentTraveler,
  allDestinations,
  allTrips
) => {
  userCard.innerHTML = ` <div class="navigation-user-card">
     <h2 class="navigation-user-welcome">Welcome back ${currentTraveler.returnTravelersFirstName()}!</h2>
     <p>I love that you are a ${currentTraveler.travelerType} ✨</p>
     <p class="navigation-stats-sent">Here are your stats:</p>
        <p class="navigation-stats-invested">You have invested $ ${allTrips.calculateTotalSpentByTraveler(
          currentTraveler.id,
          allDestinations
        )} in your happiness</p>
      </div>`;
};

pastTripsButton.addEventListener("click", () => {
  renderPastTrips(allTrips, currentTraveler, date);
});


const renderPastTrips = (allTrips, currentTraveler, date) => {
  let trips = allTrips.returnPastTrips(currentTraveler.id, date)
  usersCard.innerHTML = " ";
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
  });
};
