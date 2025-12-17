console.log("Hello tracker");

async function getMedicationData() {
  const response = await fetch("http://localhost:8080/get-info");
  const medicineData = await response.json();
  console.log(medicineData);
  renderLeftToTake(medicineData);
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
