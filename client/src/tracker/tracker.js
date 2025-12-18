console.log("Hello tracker");

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

// LARA'S CODE:
//   //loop to create p tags for name and time for each medication
//   for (let i = 0; i < medicineData.length; i++) {
//     const medicationP = createPtag(
//       medicineData[i].medication_name,
//       "medicineName"
//     );
//     const timeP = createPtag(medicineData[i].time_of_day, "timeToTake");
//     notTakenMedDiv.append(medicationP);
//     timeToTakeDiv.append(timeP); //times for medication
//   }
// }

// set up variable that stores whether the reminder has already been sent that day or not - if it is not in the Set it runs, if it is then it's ignored
const remindersShown = new Set();

// set up isTimeToTake function - compares medication time to current time
// this function takes one row (medication entry) and the current time, and returns true or false - decides whether popup should show or not
function isTimeToTake(row, now) {
  // this takes the time of day (14:30), splits into 2 objects "14" and "30" and map.Number turns the strings into numbers
  const [hour, minute] = row.time_of_day.split(":").slice(0, 2).map(Number);
  // check if current hour/minute equals the one in the row - both must be true to trigger the reminder
  const sameHour = now.getHours() === hour;
  const sameMinute = now.getMinutes() === minute;
  // create a unique reminder key for each day (e.g. Aspirin-Mon Dec 16 2025)
  const todayKey = `${row.medication_name}-${now.toDateString()}`;

  // if it is the same hour and minute as the database and we have not already shown the reminder, then it is true and we show the popup
  if (sameHour && sameMinute && !remindersShown.has(todayKey)) {
    // mark the reminder as shown so it wont show again
    remindersShown.add(todayKey);
    return true;
  }
  return false;
}

// create a fuction that sends a reminder at the time inputted in form
function sendReminder(row) {
  const reminderPopUp = document.createElement("div");
  reminderPopUp.className = "reminder-popup";
  reminderPopUp.textContent = `Please take ${row.dosage} of ${row.medication_name} now`;
  document.body.appendChild(reminderPopUp);
  // close pop up after 10 seconds
  setTimeout(() => {
    reminderPopUp.remove();
  }, 10000);
}

// create fuction to check if reminder should be sent (runs every minute) - this runs every 60 seconds (60*1000 ms)? - use interval to do this
// startReminderChecker runs a clock every minute, checks the current time against each medication’s schedule, and triggers a popup when the time matches
function startReminderChecker(medicineData) {
  // every 60 seconds, run this setInterval block of code
  setInterval(() => {
    // create a const called now which represents what the current time is (fornat is Mon Dec 16 2025 14:30:12 GMT+0000) - from this we can extract current hour using now.getHours(), minute now.getMinutes() and day of week now.getDay()
    const now = new Date();
    // we want to create a loop to run through all medications on that users database, to check if that medication should be taken now
    medicineData.forEach((row) => {
      // given the current time, should the medication be taken now Y/N?
      if (isTimeToTake(row, now)) {
        sendReminder(row);
      }
    });
    // check every minute
  }, 60 * 1000);
}

// export this to show across the whole website
//Overview section

async function renderOverview(medicineData) {
  const medName = document.getElementById("medName");
  for (let i = 0; i < medicineData.length; i++) {
    const med = document.createElement("p");
    med.textContent = `> ${medicineData[i].medication_name}`;
    medName.appendChild(med);

    const medInfo = document.createElement("ul");
    medInfo.classList = "hide";
    medName.appendChild(medInfo);

    const dosage = document.createElement("li");
    dosage.textContent = `Dosage: ${medicineData[i].dosage}`;
    medInfo.appendChild(dosage);

    const howOften = document.createElement("li");
    howOften.textContent = `Take ${medicineData[i].how_often}`;
    medInfo.appendChild(howOften);

    const timeOfDay = document.createElement("li");
    timeOfDay.textContent = `Take at ${medicineData[i].time_of_day}`;
    medInfo.appendChild(timeOfDay);

    const reOrder = document.createElement("li");
    reOrder.textContent = `Re-order ${medicineData[i].re_order}`;
    medInfo.appendChild(reOrder);

    med.addEventListener("click", () => {
      medInfoDisplay(medInfo);
    });
  }
}

function medInfoDisplay(medInfo) {
  medInfo.classList.toggle(`hide`);
  medInfo.classList.toggle(`med-info`);
}
