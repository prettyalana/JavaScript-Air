"use strict";
const getJSON = async () => {
  const data = await fetch("https://my.api.mockaroo.com/flight_logs.json?key=5776e910").then((response) =>
    response.json()
  );
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

    let airlineName = [...myArray].filter(
      (flight) => flight.airline == selectedAirline
    );

    const table = document.createElement("table");
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    airlineName.map((flightInfo) => {
      const row = document.createElement("tr");
    
      let cell = document.createElement("td");
      cell.textContent = flightInfo.flight_number;
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.textContent = flightInfo.departure_airport;
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.textContent = flightInfo.departure_date;
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.textContent = flightInfo.departure_time;
      row.appendChild(cell);

      tableBody.appendChild(row);
    });

    table.appendChild(tableHeader);
    // put the <tbody> in the <table>
    table.appendChild(tableBody);
    // appends <table> into <body>
    const htmlTable = document.getElementById("info").appendChild(table);
    // sets the border attribute of table to '2'
    table.setAttribute("border", "2");

    setTimeout(() => {
      this.reset();
    }, 5000);
  });
});
