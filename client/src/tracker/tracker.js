console.log("Hello tracker");

async function getMedicationData() {
  const response = await fetch("http://localhost:8080/get-info");
  const medicineData = await response.json();
  console.log(medicineData);
  renderLeftToTake(medicineData);
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

//dom manipulation to add medication names into section 1 and 2
async function renderLeftToTake(medicineData) {
  const notTakenMedDiv = document.getElementById("notTakenmedName");
  const timeToTakeDiv = document.getElementById("timeTaken");
  for (let i = 0; i < medicineData.length; i++) {
    const medicationP = createPtag(
      medicineData[i].medication_name,
      "medicineName"
    );
    notTakenMedDiv.appendChild(medicationP);
  }
}

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
