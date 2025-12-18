console.log("Hello World!");

//TODO: in our JS, we are going to create sections, functons and navigation regarding the data from our form

let userName = {};
console.log(userName);

//TODO: render users' data on the interface

//break it down in steps:

// render the data using DOM elements (one per piece of data)

// I need it to create elements for each of its properties

async function getMedicationData() {
  const response = await fetch(
    "https://prescription-tracker-server.onrender.com/get-info"
  );
  const medicineData = await response.json();
  console.log(medicineData);
  renderTodayMedication(medicineData);
  startReminderChecker(medicineData);
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
  const upComingReminder = document.getElementById("upcoming-reminder");

  const yourTracker = document.getElementById("your-tracker");

  const prescriptionButton = document.getElementById("button");
  prescriptionButton.textContent = "Prescription";
  yourTracker.appendChild(prescriptionButton);
  prescriptionButton.id = "prescription-button";

  const plantWateringButton = document.createElement("button");
  plantWateringButton.textContent = "Plant Watering Button";
  yourTracker.appendChild(plantWateringButton);
  plantWateringButton.id = "plant-watering-button";

  const createANewTracker = document.createElement("button");
  createANewTracker.textContent = "Create a New Tracker";
  yourTracker.appendChild(createANewTracker);
  createANewTracker.id = "create-a-new-tracker";
}

createElement();

// reminder copied to homepage

const remindersShown = new Set();

function isTimeToTake(row, now) {
  const [hour, minute] = row.time_of_day.split(":").slice(0, 2).map(Number);
  const sameHour = now.getHours() === hour;
  const sameMinute = now.getMinutes() === minute;
  const todayKey = `${row.medication_name}-${now.toDateString()}`;
  if (sameHour && sameMinute && !remindersShown.has(todayKey)) {
    remindersShown.add(todayKey);
    return true;
  }
  return false;
}

function sendReminder(row) {
  const reminderPopUp = document.createElement("div");
  reminderPopUp.className = "reminder-popup";
  reminderPopUp.textContent = `Please take ${row.dosage} of ${row.medication_name} now`;
  document.body.appendChild(reminderPopUp);
  setTimeout(() => {
    reminderPopUp.remove();
  }, 10000);
}

function startReminderChecker(medicineData) {
  setInterval(() => {
    const now = new Date();
    medicineData.forEach((row) => {
      if (isTimeToTake(row, now)) {
        sendReminder(row);
      }
    });
  }, 60 * 1000);
}
