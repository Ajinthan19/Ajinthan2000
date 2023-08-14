//Ticket booking page JS


if (document.getElementById('ticketbooking')){
    const tbodyEl = document.querySelector('tbody'); // summery table
    const tickettype = ["Srilankan Adult", "Srilankan Child", "Foreign Adult", "Foreign Child", "Infant"];
    const ticketprice = [4, 2, 10, 5, 0]; // prices of each category in correct order
    let tickets = [0, 0, 0, 0, 0]; // Initial number of tickets for each category
    const contBTN = document.getElementById('contBTN');
    
    const incrementBtn = document.getElementsByClassName('i');
    const decrementBtn = document.getElementsByClassName('d');
    
    //Calender ...................................
    const daysCont = document.querySelector('.caldays'),
          nextBtn = document.querySelector('.next-btn'),
          prevBtn = document.querySelector('.prev-btn'),
          month = document.querySelector('.month');
    
    const months = [
        "January", 
        "February",
         "March",
          "April",
           "May",
           "June",
        "July",
         "August",
          "September",
           "October",
            "November", 
            "December"
    ];
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getUTCFullYear();
    
    function renderCal() {
        date.setDate(1);
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const lastDayind = lastDay.getDay();
        const lastDayDate = lastDay.getDate();
        const prevLastDay = new Date(currentYear, currentMonth, 0);
        const prevLastDayDate = prevLastDay.getDate();
        const nextDays = 7 - lastDayind - 1;
    
        month.innerHTML = `${months[currentMonth]} ${currentYear}`;
    
        let daysHtml = "";
    
        for (let x = firstDay.getDay(); x > 0; x--) {
            daysHtml += `<div class="day prev">${[prevLastDayDate - x + 1]}</div>`;
        }
        for (let i = 1; i <= lastDayDate; i++) {
            if (
                i === new Date().getDate() &&
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getUTCFullYear()
            ) {
                daysHtml += `<div class="day today">${i}</div>`;
            } else {
                daysHtml += `<div class="day">${i}</div>`;
            }
        }
    
        for (let j = 1; j <= nextDays; j++) {
            daysHtml += `<div class="day next">${j}</div>`;
        }
        daysCont.innerHTML = daysHtml;
    
      
        addDayEventListeners();
    }
    
    
    
    function addDayEventListeners() {
    
        allDays.forEach(day => {
            day.removeEventListener('click', handleDayClick);
        });
    
        
        allDays = document.querySelectorAll('.day');
        allDays.forEach(day => {
            day.addEventListener('click', handleDayClick);
        });
    }
    
    
    let allDays = document.querySelectorAll('.day');
    allDays.forEach(day => {
        day.addEventListener('click', handleDayClick);
    });
    function handleDayClick(event) {
      const clickedDay = event.target.textContent;
      const clickedDate = new Date(currentYear, currentMonth, clickedDay);
    
    
    
      console.log('Selected Day:', clickedDay);
      console.log('Selected Date:', new Date(currentYear, currentMonth, clickedDay));
      const clickedCalDiv = document.querySelector('.clickedcal');
      clickedCalDiv.textContent = `Selected Date: ${clickedDate.toDateString()}`;
      
    
      localStorage.setItem('selectedDate',clickedDate.toDateString());
      
    }
    nextBtn.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCal();
    });
    
    prevBtn.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCal();
    });
    
    
    renderCal();
}


let selectedOptions;
const slAdultInput = document.getElementById('slAdult');
const slChildInput = document.getElementById('slChild');
const foreignerAdultInput = document.getElementById('foreignerAdult');
const foreignerChildInput = document.getElementById('foreignerChild');
const infantInput = document.getElementById('infant');

const incrementBtns = document.querySelectorAll('.incrementBtn');
const decrementBtns = document.querySelectorAll('.decrementBtn');

incrementBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const inputField = btn.previousElementSibling;
    inputField.value = parseInt(inputField.value) + 1;
    savelocal();
    createsummary();
  });
});

decrementBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const inputField = btn.nextElementSibling;
    if (parseInt(inputField.value) > 0) {
      inputField.value = parseInt(inputField.value) - 1;
      savelocal();
      createsummary();

    }
  });
});

function savelocal(){
  selectedOptions = {
    'Foreigner Adults': foreignerAdultInput.value,
    'Foreigner Child': foreignerChildInput.value,
    'SL Adults': slAdultInput.value,
    'SL Child': slChildInput.value,
    'Infant': infantInput.value
  };

  localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
}

//experiment

let selectedTimelines = [];
let peakhours = [];
let filteredSelectedTimelines = [];
const dropdownc = document.querySelector('.lists');


function handleCheckboxChange(checkbox) {
  const value = checkbox.value;
  if (checkbox.checked) {
    // Add the value to the array if the checkbox is checked
    selectedTimelines.push(parseInt(value));
  } else {
    // Remove the value from the array if the checkbox is unchecked
    const index = selectedTimelines.indexOf(parseInt(value));
    if (index !== -1) {
      selectedTimelines.splice(index, 1);
    }
  }

  // Numbers to remove
  const numbersToRemove = [4, 5, 6, 9, 10, 11];
  peakhours = selectedTimelines.filter(number => numbersToRemove.includes(number));
  filteredSelectedTimelines = selectedTimelines.filter(number => !numbersToRemove.includes(number));
  console.log("peakhours: " + peakhours)
  console.log("filteredSelectedTimelines: " + filteredSelectedTimelines)
  // You can do something with the selectedTimelines array here
  console.log(selectedTimelines);
  createsummary()
}

function createsummary() {
  // Get the date and time for the summary
  
  const durationNormalHrs = filteredSelectedTimelines.length; //done
  const durationPeakHrs = peakhours.length; //done
   

  // Get the number of visitors in each category
  const foreignerAdults = parseInt(foreignerAdultInput.value);
  const foreignerChildren = parseInt(foreignerChildInput.value);
  const slAdults = parseInt(slAdultInput.value);
  const slChildren = parseInt(slChildInput.value);
  const infants = parseInt(infantInput.value);

  // Calculate the charges for each category
  const charges = {
    foreignerAdultNormal: 10,
    foreignerAdultPeak: 13,
    foreignerChildNormal: 5,
    foreignerChildPeak: 8,
    slAdultNormal: 4,
    slAdultPeak: 6,
    slChildNormal: 2,
    slChildPeak: 3,
  };

  // Calculate the charges for each category based on the number of normal and peak hours
  const foreignerAdultCharge = (charges.foreignerAdultNormal * durationNormalHrs) + (charges.foreignerAdultPeak * durationPeakHrs);
  const foreignerChildCharge = (charges.foreignerChildNormal * durationNormalHrs) + (charges.foreignerChildPeak * durationPeakHrs);
  const slAdultCharge = (charges.slAdultNormal * durationNormalHrs) + (charges.slAdultPeak * durationPeakHrs);
  const slChildCharge = (charges.slChildNormal * durationNormalHrs) + (charges.slChildPeak * durationPeakHrs);

  // Calculate the total charges for each category
  const totalForeignerAdultCharge = foreignerAdultCharge * foreignerAdults;
  const totalForeignerChildCharge = foreignerChildCharge * foreignerChildren;
  const totalSLAdultCharge = slAdultCharge * slAdults;
  const totalSLChildCharge = slChildCharge * slChildren;

  // Calculate the total payable amount
  const totalPayable = totalForeignerAdultCharge + totalForeignerChildCharge + totalSLAdultCharge + totalSLChildCharge;



  // Generate the summary text
  const summary = `
<table class="summarytent">
    <tr><td>Duration:</td><td> ${durationNormalHrs} hrs (${durationNormalHrs} Normal : ${durationPeakHrs} Peak)</td></tr>
    <tr><th>Tickets</th><th>Charges</th></tr>
    <tr><td>${foreignerAdults} Foreigner Adult</td><td> $${totalForeignerAdultCharge}</td></tr>
    <tr><td>${foreignerChildren} Foreigner Child</td><td> $${totalForeignerChildCharge}</td></tr>
    <tr><td>${slAdults} SL Adult</td><td> $${totalSLAdultCharge}</td></tr>
    <tr><td>${slChildren} SL Child</td><td> $${totalSLChildCharge}</td></tr>
    <tr><td>${infants} Infant</td><td> Free</td></tr>
    <tr><th>Total Payable:</th><th>$${totalPayable}</th></tr>
</table>
`;

  document.getElementById("summarytbl").innerHTML = summary;
  // You can display the summary on the webpage or do whatever you want with it here

  // Save the summary table HTML to local storage with a key 'summaryTable'
  localStorage.setItem('summarytbl', summary);

}



/////////////////////////////////////////////////////////////////////
// Load and display the summary with user details on DOM content load
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the combined summary from local storage
  const combinedSummary = localStorage.getItem("summarytbl");

  // Display the combined summary on the webpage
  if (combinedSummary) {
    document.getElementById("summarytbl").innerHTML = combinedSummary;
  } else {
    // Handle the case where the summary is not available
    document.getElementById("summarytbl").innerHTML = "Summary not available.";
  }
});

//button disable//
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the input fields, checkboxes, and the submit button
  var foreignerAdultInput = document.getElementById("foreignerAdult");
  var foreignerChildInput = document.getElementById("foreignerChild");
  var slAdultInput = document.getElementById("slAdult");
  var slChildInput = document.getElementById("slChild");
  var infantInput = document.getElementById("infant");

  var checkboxes = document.querySelectorAll('input[name="timelines"]');
  var submitButton = document.getElementById("myButton");

  // Function to check if all input fields and checkboxes are filled and valid
  function validateInputs() {
    // Perform your validation logic here
    // For example, check if the input fields are not empty and contain valid values

    // For simplicity, let's assume we're only checking if the input fields are not empty
    var inputFieldsValid =
      foreignerAdultInput.value.trim() !== "" &&
      foreignerChildInput.value.trim() !== "" &&
      slAdultInput.value.trim() !== "" &&
      slChildInput.value.trim() !== "" &&
      infantInput.value.trim() !== "";

    // Check if at least one checkbox is checked
    var checkboxesValid = false;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesValid = true;
        break;
      }
    }

    // Enable the submit button only if all input fields and checkboxes are valid
    submitButton.disabled = !(inputFieldsValid && checkboxesValid);
  }

  // Add event listeners to input fields to trigger validation on input change
  foreignerAdultInput.addEventListener("input", validateInputs);
  foreignerChildInput.addEventListener("input", validateInputs);
  slAdultInput.addEventListener("input", validateInputs);
  slChildInput.addEventListener("input", validateInputs);
  infantInput.addEventListener("input", validateInputs);

  // Add event listeners to checkboxes to trigger validation on change
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", validateInputs);
  }

  // Add a click event listener to the button
  submitButton.addEventListener("click", function () {
    // Redirect to the desired HTML page
    window.location.href = "details.html";
  });

  // Add event listener for the form submission
  document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Store data in local storage
    const userData = {
      fullName: document.getElementById("fullName").value,
      countryCode: document.getElementById("countryCode").value,
      mobileNumber: document.getElementById("mobileNumber").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to payment.html
    window.location.href = "payment.html";
  });

});



            
          










