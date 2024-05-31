//******************************* SELECTIONS

const rows = document.querySelectorAll(".rows");
const cost = document.querySelector(".cost");
// Select seats total
let totalseats = document.querySelector(".totalseats");
let place = document.querySelector(".place");
// Select button
const acquista = document.querySelector(".btnbook");
// Select film selector
let film = document.getElementById("film");
// Select sedie
const sedie = document.querySelectorAll(".seat:not(.occupied");
// Global Variables
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;

// Select rows number and set the innerHtml value
let rowNumb = document.querySelectorAll(".rowNumb");
rowNumb.forEach(element => {
  element.innerHTML = `Row-  ${element.id}`;
});

//******************* UPDATE VALUES FUNCTION */
const updateValues = (seatNumber, seatRow, removeSeat) => {
  // Select seats with class 'selected'
  let seatSelected = document.querySelectorAll(".row .seat.selected");

  // Create array for localstorage
  let localStorageSeats = [...seatSelected].map(seat => {
    return [...sedie].indexOf(seat);
  });
  // Save seats selected inside browser localstorage
  localStorage.setItem("poltrone", JSON.stringify(localStorageSeats));

  // Populate info area
  if (seatNumber && seatRow !== undefined) {
    if (!removeSeat) {
      place.innerHTML += ` ${seatNumber}/${seatRow} -`;
      // Save value inside browser local storage
      localStorage.setItem("S&&F", place.innerHTML);
    } else {
      place.innerHTML = place.innerHTML.replace(
        ` ${seatNumber}/${seatRow} -`,
        ""
      );
      // Save value inside browser local storage
      localStorage.setItem("S&&F", place.innerHTML);
    }
  }
  // Set ticket price
  let ticket = film.value;
  // Seats total number
  totalseats.innerHTML = seatSelected.length;
  // Price
  cost.innerHTML = seatSelected.length * ticket;
};

//************ Load data from browser local storage */
let sedieNotSelected = document.querySelectorAll(".seat:not(.selected)");
const loadData = () => {
  // Load data from the browser
  let poltrone = JSON.parse(localStorage.getItem("poltrone"));
  let movie = localStorage.getItem("movie");
  let price = localStorage.getItem("price");
  let occupied = JSON.parse(localStorage.getItem("occupied"));

  // Set selected seats
  if (poltrone !== null && poltrone.length > 0) {
    sedie.forEach((poltrona, index) => {
      if (poltrone.indexOf(index) > -1) {
        poltrona.classList.add("selected");
      }
    });
  }
  // Set seats occupied
  if (occupied !== null && occupied.length > 0) {
    sedieNotSelected.forEach((poltrona, index) => {
      if (occupied.indexOf(index) > -1) {
        poltrona.classList.add("occupied");
      }
    });
  }

  // Set movie title
  let movieSavedIdx = localStorage.getItem("movie");
  if (movieSavedIdx !== null) {
    film.selectedIndex = movieSavedIdx;
  }

  // Update values
  updateValues();

  // Populate area info
  let seatsInfo = localStorage.getItem("S&&F");
  place.innerHTML = seatsInfo;
};
// Run load data
loadData();

//*************** Select sedie and add event listener */
const sedieReload = document.querySelectorAll(".seat:not(.occupied");
sedieReload.forEach(element => {
  // Set seat number
  element.innerHTML = element.id;
  // Add event listener
  element.addEventListener("click", () => {
    seatRow = element.parentElement.id;
    seatNumber = element.id;

    // Add and remove color class
    if (element.classList.value == "seat") {
      element.classList.add("selected");
      // Set false remove variable
      removeSeat = false;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    } else {
      element.classList.remove("selected");
      // Set true remove variable
      removeSeat = true;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    }
  });
});

//********************* Movie title event listener */
film.addEventListener("change", e => {
  // Ticket
  let ticket = parseInt(e.target.value);
  let movieTitle = e.target.selectedIndex;
  // Save inside localstorage movie title
  localStorage.setItem("movie", movieTitle);
  // Save price
  localStorage.setItem("price", ticket);
  // Update value
  updateValues();
});

//***************** BTN ACQUISTA EVENT LISTENER */
acquista.addEventListener("click", () => {
  let seat = document.querySelectorAll(".seat.selected");
  seat.forEach(element => {
    element.classList.remove("selected");
    element.classList.add("occupied");
    // Clear all fields
    element.innerHTML = "";
    totalseats.innerHTML = "";
    cost.innerHTML = "";
    place.innerHTML = "";
    // Clear localStorage
    localStorage.clear();

    // Save inside local Storage
    let seatBusySelec = document.querySelectorAll(".row .seat.occupied");

    const localStorageSeatsOccupied = [...seatBusySelec].map(seat => {
      return [...sedieNotSelected].indexOf(seat);
    });

    // Save
    localStorage.setItem("occupied", JSON.stringify(localStorageSeatsOccupied));
  });
});