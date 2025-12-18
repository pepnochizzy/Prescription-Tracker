console.log("Hello form");

const newPrescriptionForm = document.getElementById("newPrescriptionForm");

async function handlePrescriptionSubmit(event) {
  event.preventDefault();
  const formDataTemplate = new FormData(newPrescriptionForm);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  await fetch("http://localhost:8080/create-prescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  medAddedFunction();
}

newPrescriptionForm.addEventListener("submit", handlePrescriptionSubmit);

function medAddedFunction() {
  const medAdded = document.createElement("p");
  medAdded.textContent = "Prescription added!";
  medAdded.className = "med-added";
  newPrescriptionForm.appendChild(medAdded);

  /*setTimeout(() => {
    medAdded.remove();
  }, 3000);*/
}
