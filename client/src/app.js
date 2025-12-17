console.log("Hello World!");

//TODO: in our JS, we are going to create sections, functons and navigation regarding the data from our form

let userName = {};
console.log(userName);

//TODO: render users' data on the interface

//break it down in steps:

// render the data using DOM elements (one per piece of data)

// I need it to create elements for each of its properties

function createElement() {
  const upComingReminder = document.getElementById("upcoming-reminder");

  const yourTracker = document.getElementById("your-tracker");

  const prescriptionButton = document.createElement("button");
  prescriptionButton.textContent = "Prescription";
  yourTracker.appendChild(prescriptionButton);

  const plantWateringButton = document.createElement("button");
  plantWateringButton.textContent = "Plant Watering Button";
  yourTracker.appendChild(plantWateringButton);

  const createANewTracker = document.createElement("button");
  createANewTracker.textContent = "Create a New Tracker";
  yourTracker.appendChild(createANewTracker);
}

createElement();
