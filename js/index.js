"use strict";
const getJSON = async () => {
  const data = await fetch(
    "https://my.api.mockaroo.com/flight_logs.json?key=5776e910"
  ).then((response) => response.json());
  return data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const myArray = await getJSON();
  const form = document.getElementById("form-id");

  form.addEventListener("submit", function (event) {
    // clears old table before adding a new one
    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = "";

    // Prevent page reload
    event.preventDefault();

    const output = document.getElementById("info");

    const selectedAirline = document.getElementById("airline-select").value;

    let airlineFlightObjects = [...myArray].filter(
      (flight) => flight.airline == selectedAirline
    );

    const table = document.createElement("table");
    const airlineNameHeader = document.createElement("thead");
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    // get the airline name from the airlineFlightObjects array
    const airlineInfo = airlineFlightObjects[0]["airline"];

    // Create the airline name row
    const airlineRow = document.createElement("tr");

    // Create the airline name header
    let airline = document.createElement("th");
    airline.textContent = airlineInfo;
    airlineRow.appendChild(airline).colSpan = "4";

    airlineNameHeader.appendChild(airlineRow);

    const columnHeaders = ["Time", "Flight", "Airport", "Date"];

    const headerRow = document.createElement("tr");

    columnHeaders.forEach((headerName) => {
      let header = document.createElement("th");

      header.textContent = headerName;

      headerRow.appendChild(header);
    });

    tableHeader.appendChild(headerRow);

    airlineFlightObjects.map((flightInfo) => {
      const row = document.createElement("tr");

      let cell = document.createElement("td");
      cell.textContent = flightInfo.departure_time;
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.textContent = flightInfo.flight_number;
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.textContent = flightInfo.departure_airport;
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.textContent = flightInfo.departure_date;
      row.appendChild(cell);

      tableBody.appendChild(row);
    });

    table.appendChild(airlineNameHeader);
    table.appendChild(tableHeader);
    // put the <tbody> in the <table>
    table.appendChild(tableBody);
    // appends <table> into <body>
    const htmlTable = document.getElementById("info").appendChild(table);
    // sets the border attribute of table to '2'
    table.setAttribute("border", "2");

    setTimeout(() => {
      this.reset();
    });
  });
});
