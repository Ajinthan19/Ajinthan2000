// Load ticket selection from local storage
const ticketSelection = JSON.parse(localStorage.getItem("ticketSelection"));
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
// Function to display the summary table
function displaySummaryTable() {
  const tbody = document.getElementById("tbody1");
  tbody.innerHTML = "";

  const ticketPrices = {
    "SL Adult": 4,
    "SL Child": 2,
    "Foreigner Adult": 10,
    "Foreigner Child": 13,
    "Infant": 0,
  };

  let totalAmount = 0;

  for (const ticketType in ticketSelection) {
    const ticketCount = ticketSelection[ticketType];
    const ticketPrice = ticketPrices[ticketType];
    const ticketTotal = ticketCount * ticketPrice;
    totalAmount += ticketTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ticketType}</td>
      <td>${ticketCount}</td>
      <td>${ticketTotal} USD</td>
    `;

    tbody.appendChild(row);
  }

  // Update the total amount
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td colspan="2"><strong>Total Amount:</strong></td>
    <td><strong>${totalAmount.toFixed(2)} USD</strong></td>
  `;

  tbody.appendChild(totalRow);
}
// Load user details and display summary table when the page loads
window.addEventListener("load", () => {
  displaySummaryTable();
});
// Display user details in the summary table
const userDetailsRow = document.createElement("tr");
userDetailsRow.innerHTML = `
  <td colspan="3"><strong>User Details</strong></td>
`;
tbody.appendChild(userDetailsRow);

const fullNameRow = document.createElement("tr");
fullNameRow.innerHTML = `
  <td>Full Name:</td>
  <td>${userDetails.fullName}</td>
  <td></td>
`;
tbody.appendChild(fullNameRow);

const emailRow = document.createElement("tr");
emailRow.innerHTML = `
  <td>Email:</td>
  <td>${userDetails.email}</td>
  <td></td>
`;
tbody.appendChild(emailRow);

const phoneRow = document.createElement("tr");
phoneRow.innerHTML = `
  <td>Phone Number:</td>
  <td>${userDetails.mobileNumber}</td>
  <td></td>
`;
tbody.appendChild(phoneRow);

const genderRow = document.createElement("tr");
genderRow.innerHTML = `
  <td>Gender:</td>
  <td>${userDetails.gender}</td>
  <td></td>
`;
tbody.appendChild(genderRow);


// Add event listeners to form fields and "Confirm Purchase" button
document.getElementById("fullName").addEventListener("input", checkFormCompletion);
document.getElementById("phone").addEventListener("input", checkFormCompletion);
document.getElementById("email").addEventListener("input", checkFormCompletion);
document.getElementById("confirmEmail").addEventListener("input", checkFormCompletion);
document.getElementById("fullName").addEventListener("input", updateSummaryTable);
document.getElementById("phone").addEventListener("input", updateSummaryTable);
document.getElementById("email").addEventListener("input", updateSummaryTable);
document.getElementById("confirmEmail").addEventListener("input", updateSummaryTable);
document.getElementById("gender").addEventListener("change", updateSummaryTable);

// Function to update the summary table based on form inputs
function updateSummaryTable() {
  displaySummaryTable(); // Update the summary table when form inputs change
  checkFormCompletion(); // Update the "Confirm Purchase" button status
}


document.getElementById("userDetailsForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Store user details and ticket selection in local storage
  storeConfirmationData();

  // Redirect to the confirmation receipt page
  window.location.href = "purchase_card_details.html";
});

// Function to check if the form is completed to enable the "Confirm Purchase" button
function checkFormCompletion() {
  const fullName = document.getElementById("fullName").value;
  const mobileNumber = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const confirmEmail = document.getElementById("confirmEmail").value;

  const isFormCompleted = fullName.trim() !== "" && mobileNumber.trim() !== "" &&
    email.trim() !== "" && confirmEmail.trim() !== "" && email === confirmEmail;

  const confirmPurchaseBtn = document.getElementById("confirmPurchaseBtn");
  if (isFormCompleted) {
    confirmPurchaseBtn.removeAttribute("disabled");
  } else {
    confirmPurchaseBtn.setAttribute("disabled", "true");
  }
}

// Function to store user details and ticket selection in local storage
function storeConfirmationData() {
  const fullName = document.getElementById("fullName").value;
  const mobileNumber = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;

  const confirmationData = {
    fullName,
    mobileNumber,
    email,
    gender,
    ticketSelection
  };

  // Store the confirmation data in local storage as a JSON string
  localStorage.setItem("confirmationData", JSON.stringify(confirmationData));
}

// Call the functions to display the summary table and check the form completion initially
displaySummaryTable();
checkFormCompletion();



