console.log("Hello World!");

//TODO: in our JS, we are going to create sections, functons and navigation regarding the data from our form

let userName = {};
console.log(userName);

//TODO: render users' data on the interface

//break it down in steps:

// render the data using DOM elements (one per piece of data)

// I need it to create elements for each of its properties

async function getMedicationData() {
  const response = await fetch("http://localhost:8080/get-info");
  const medicineData = await response.json();
  console.log(medicineData);
  renderTodayMedication(medicineData);
  startReminderChecker(medicineData);
  renderOverview(medicineData);
}
getMedicationData();

//this function simplifies other functions
function createPtag(text, i) {
  const p = document.createElement("p");
  p.textContent = text;
  p.className = i;
  return p;
}

// create a function to check if med time is in the past
function isMedTimeInPast(timeOfDay) {
  const now = new Date();
  const [hour, minute] = timeOfDay.split(":").map(Number);
  const medTime = new Date();
  medTime.setHours(hour, minute, 0, 0);
  // return true if time has passed or false if medication time is still to come
  return medTime <= now;
}

//dom manipulation to add medication names into section 1 and 2
export async function renderTodayMedication(medicineData) {
  //LEFT TO TAKE
  const notTakenMedDiv = document.getElementById("notTakenmedName");
  const timeToTakeDiv = document.getElementById("timeToTake");

  // TAKEN ALREADY
  const takenMedDiv = document.getElementById("takenMedName");
  const timeTakenDiv = document.getElementById("timeTaken");

  //create titles for top of table and append
  const notTakenNameTitle = createPtag("Medication", "title");
  const timeToTakeTitle = createPtag("Time to take", "title");
  notTakenMedDiv.append(notTakenNameTitle);
  timeToTakeDiv.append(timeToTakeTitle);

  const takenNameTitle = createPtag("Medication", "title");
  const timeTakenTitle = createPtag("Taken at", "title");
  takenMedDiv.append(takenNameTitle);
  timeTakenDiv.append(timeTakenTitle);

  medicineData.forEach((row) => {
    const nameP = createPtag(row.medication_name, "medicineName");
    const timeP = createPtag(row.time_of_day, "time");

    if (isMedTimeInPast(row.time_of_day)) {
      // time passes -> taken already
      takenMedDiv.append(nameP);
      timeTakenDiv.append(timeP);
    } else {
      // time not passed -> left to take
      notTakenMedDiv.append(nameP);
      timeToTakeDiv.append(timeP);
    }
  });
}

function createElement() {
  // const upComingReminder = document.getElementById("upcoming-reminder");

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
