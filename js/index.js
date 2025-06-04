"use strict";
const getJSON = async () => {
  const data = await fetch("data/flight_logs.json").then((response) =>
    response.json()
  );
  return data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const myArray = await getJSON();
  const form = document.getElementById("form-id");

  form.addEventListener("submit", function (event) {
    // Prevent page reload
    event.preventDefault();

    const output = document.getElementById("info");

    const selectedAirline = document.getElementById("airline-select").value;

    let airlineName = [...myArray].filter(
      (flight) => flight.airline == selectedAirline
    );

    let formattedFlights = airlineName.map((flightInfo) => {
      return `Flight ${flightInfo.flight_number}: Departing from ${flightInfo.departure_airport} to ${flightInfo.arrival_airport} Departure: ${flightInfo.departure_date} at ${flightInfo.departure_time} Arrival: ${flightInfo.arrival_date} at ${flightInfo.arrival_time} Duration: ${flightInfo.flight_duration} hours Passengers: ${flightInfo.passenger_count}`;
    });

    let finalOutput = formattedFlights.join("\n\n");

    output.textContent = finalOutput;

    setTimeout(() => {
      this.reset();
    }, 5000);
  });
});
