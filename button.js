const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const todayBtn = document.querySelector(".today-btn");


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
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Variable to store the selected date
let selectedDate = null;

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
  // get prev month current month and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  // update current year and month in header
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // update days html
  let days = "";

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div class="day ">${i}</div>`;
    }
  }

  // next MOnth days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar render
  hideTodayBtn();
  daysContainer.innerHTML = days;
  disablePastDays();
}

renderCalendar();





// Function to disable past days in the calendar
function disablePastDays() {
  const dayElements = document.querySelectorAll('.day');
  const today = new Date();
 

  dayElements.forEach(dayElement => {
      const day = parseInt(dayElement.textContent);
      const currentDate = new Date(currentYear, currentMonth, day);
      const isPastDay = currentDate < today;

     

      if (isPastDay) {
          dayElement.classList.add('disabled');
      } else {
          dayElement.classList.remove('disabled');
      }
  });
}


// Add event listeners to the day elements
daysContainer.addEventListener("click", (event) => {
  const selectedDayElement = event.target;
  if (selectedDayElement.classList.contains("day")) {
    if (!selectedDayElement.classList.contains("disabled")) {
      // Remove the previous selection
      const prevSelectedDay = document.querySelector(".selected");
      if (prevSelectedDay) {
        prevSelectedDay.classList.remove("selected");
      }

      // Set the new selected date
      selectedDate = new Date(currentYear, currentMonth, parseInt(selectedDayElement.textContent));
      selectedDayElement.classList.add("selected");
      // Call updateSummary after selecting a date
updateSummary();
// Update the selected date display
const selectedDateDisplay = document.getElementById("selectedDateDisplay");
selectedDateDisplay.textContent = `Selected Date: ${selectedDate.toDateString()}`;
allDays.forEach(day => {
  day.addEventListener('click', handleDayClick);
});
// Function to handle day click
function handleDayClick(event) {
  const clickedDay = event.target.textContent;

  console.log('Selected Day:', clickedDay);
  console.log('Selected Date:', new Date(currentYear, currentMonth, clickedDay));

  // Store the selected date in localStorage
  localStorage.setItem('selectedDate', new Date(currentYear, currentMonth, clickedDay));

  // Update the summary table based on the selected date
  updateSummaryTable();
}
      // Perform any other necessary operations with the selected date
      // For example, you can store it in a variable, send it to a server, etc.
     // console.log("Selected Date:", selectedDate);
    }
  }
});



nextBtn.addEventListener("click", () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener("click", () => {
  // increase by one
  currentMonth--;
  // check if let than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener("click", () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});

// lets hide today btn if its already current month and vice versa

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}















//Ticket booking page JS


if (document.getElementById('ticketbooking')){
    const tbodyEl = document.querySelector('tbody'); // summery table
    const tickettype = ["Srilankan Adult", "Srilankan Child", "Foreign Adult", "Foreign Child", "Infant"];
    const ticketprice = [4, 2, 10, 5, 0]; // prices of each category in correct order
    let tickets = [0, 0, 0, 0, 0]; // Initial number of tickets for each category
    const contBTN = document.getElementById('contBTN');
    
    const incrementBtn = document.getElementsByClassName('i');
    const decrementBtn = document.getElementsByClassName('d');
    
    
    
    // Function to update the ticket count for a specific category
    function updateTicketCount(index, value) {
      tickets[index] = value;
      updateSummaryTable();
    }
    
    // Increment button for guests part
    for (let j = 0; j < incrementBtn.length; j++) {
      let button = incrementBtn[j];
     
    
      button.addEventListener('click', function (event) {
        let buttonClicked = event.target;
        let input = buttonClicked.parentElement.children[2];//parent element is [.box] and the children [2] is input field
        let inputV = input.value;
        let newV = parseInt(inputV) + 1;
        input.value = newV;
        updateTicketCount(j, newV);
      });
    }
    
    // Decrement button for guests part
    for (let j = 0; j < decrementBtn.length; j++) {
      let button = decrementBtn[j];
      button.addEventListener('click', function (event) {
        let buttonClicked = event.target;
        let input = buttonClicked.parentElement.children[2];
        let inputV = input.value;
        let newV = parseInt(inputV) - 1;
        if (newV >= 0) {
          input.value = newV;
          updateTicketCount(j, newV);
        }
      });
    }
    
    // Time Slot selection
    const selectBtn = document.querySelector('.select-btn'),
      slots = document.querySelectorAll('.slots');
    
    selectBtn.addEventListener("click", () => {
      selectBtn.classList.toggle('open');
    });
    
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        slot.classList.toggle("checked");
        updateSummaryTable();
      });
    });
    
    // Function to calculate the total amount for the selected time slots and tickets
    function calculateTotal() {
      const checkedSlots = document.querySelectorAll('.slots.checked');
      let numberOfTimeSlot = checkedSlots.length;
      let peak = 0;
    
      for (let j = 0; j < numberOfTimeSlot; j++) {
        const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
        if (slotText >= 4 && slotText <= 6) {
          peak++;
        }
        if (slotText >= 9 && slotText <= 11) {
            peak++;
          }
        
      }
    
      let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];
    
      let totalAmount = 0;
      for (let i = 0; i < tickettype.length; i++) {
        totalAmount += numberOfTimeSlot * (ticketprice[i] * tickets[i]) + (peakhourstotal[i] * tickets[i]);
      }
    
      return totalAmount;
    }
    
    // Function to update the summary table
    function updateSummaryTable() {
      let totalAmount = calculateTotal();
      let html = `
        <tr>
          <td>Date</td>
          <td>Hours</td>

          <tr>
          <tr>
          <td>Normal hours</td>
          <td>${calculateNormalHoursTotal()} Hours</td>
          <tr>

        </tr>
        <tr>
          <td>Peak hours</td>
          <td>${calculateTotalPeakHours()} Hours</td>
        </tr>
      `;
      
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i] > 0) {
          html += `
            <tr>
              <td>${tickettype[i]} x ${tickets[i]}</td>
              <td>${calculateCategoryTotal(i)}</td>
            </tr>
          `;
        }
      }
    
      html += `
        <tr>
          <th>Total Amount</th>
          <td>${totalAmount} USD</td>
        </tr>
    
      
      `
      ;
      localStorage.setItem('tabledetails',html);
      tbodyEl.innerHTML = html;
      saveTicketDataToLocalStorage();
    
      if (totalAmount > 0) {
        contBTN.removeAttribute('disabled');
      } else {
        contBTN.setAttribute('disabled', 'true');
      }
      
      
    }
    
    
    function redirectToDetailsPage() {
      const totalAmount = calculateTotal();
    
      
      if (totalAmount > 0) {
        window.location.href = 'details.html'; 
      }
    }
     
    
    contBTN.addEventListener('click', redirectToDetailsPage);
    
    // function to save data to local storage......................
    function saveTicketDataToLocalStorage() {
        const ticketData = {
          tickettype: tickettype,
          ticketprice: ticketprice,
          tickets: tickets
        };
      
        localStorage.setItem('ticketData', JSON.stringify(ticketData));
      }
    
     
    // Function to calculate the total amount for a specific category
    function calculateCategoryTotal(categoryIndex) {
      const checkedSlots = document.querySelectorAll('.slots.checked');
      let numberOfTimeSlot = checkedSlots.length;
      let peak = 0;
    
      for (let j = 0; j < numberOfTimeSlot; j++) {
        const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
        if (slotText >= 4 && slotText <= 6) {
          peak++;
        }
        if (slotText >= 9 && slotText <= 11) {
            peak++;
          }
        
    
      }
      
    
      let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];
    
      let totalAmount = numberOfTimeSlot * (ticketprice[categoryIndex] * tickets[categoryIndex]) + (peakhourstotal[categoryIndex] * tickets[categoryIndex]);
    
      return totalAmount;
    
    
      }
    
    // Function to calculate the total peak hours
    function calculateTotalPeakHours() {
      const checkedSlots = document.querySelectorAll('.slots.checked');
      let numberOfTimeSlot = checkedSlots.length;
      let peak = 0;
    
      for (let j = 0; j < numberOfTimeSlot; j++) {
        const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
        if (slotText >= 4 && slotText <= 6) {
          peak++;
        }
        if (slotText >= 9 && slotText <= 11) {
            peak++;
          }
      }
     localStorage.setItem("peakhrs",peak);
      return peak;
    }
    
    


    
    // Function to calculate the total amount for normal hours
function calculateNormalHoursTotal() {
    const checkedSlots = document.querySelectorAll('.slots.checked');
    let numberOfTimeSlot = checkedSlots.length;
    let normalHours = 0;
  
    for (let j = 0; j < numberOfTimeSlot; j++) {
      const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
      if ((slotText >= 1 && slotText <= 3) || (slotText >= 7 && slotText <= 8)) {
        normalHours++;
      }
    }
  
    let normalHoursTotal = normalHours ; // Adjust this based on your calculation logic
  
    return normalHoursTotal;
  }
  
  // Function to update the summary table with normal hours
  function updateSummaryTableWithNormalHours() {
    let totalAmount = calculateTotal();
    let normalHoursTotal = calculateNormalHoursTotal();
    let html = `
      <tr>
        <td>Date</td>
        <td></td>
      </tr>
      <tr>
        <td>Normal hours</td>
        <td>${calculateNormalHoursTotal} Hours</td>
      </tr>
      <tr>
        <td>Peak hours</td>
        <td>${calculateTotalPeakHours()} Hours</td>
      </tr>
    `;
  
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i] > 0) {
        html += `
          <tr>
            <td>${tickettype[i]} x ${tickets[i]}</td>
            <td>${calculateCategoryTotal(i)}</td>
          </tr>
        `;
      }
    }
  
    html += `
      <tr>
        <th>Total Amount</th>
        <td>${totalAmount} USD</td>
      </tr>
    `;
  
    localStorage.setItem('tabledetails', html);
    tbodyEl.innerHTML = html;
    saveTicketDataToLocalStorage();
  
    if (totalAmount > 0) {
      contBTN.removeAttribute('disabled');
    } else {
      contBTN.setAttribute('disabled', 'true');
    }
  }
  
  // Call this function when updating the summary table
  updateSummaryTableWithNormalHours();
  
   













//Ticket booking page JS


if (document.getElementById('ticketbooking')){
    const tbodyEl = document.querySelector('tbody'); // summery table
    const tickettype = ["Srilankan Adult", "Srilankan Child", "Foreign Adult", "Foreign Child", "Infant"];
    const ticketprice = [4, 2, 10, 5, 0]; // prices of each category in correct order
    let tickets = [0, 0, 0, 0, 0]; // Initial number of tickets for each category
    const contBTN = document.getElementById('contBTN');
    
    const incrementBtn = document.getElementsByClassName('i');
    const decrementBtn = document.getElementsByClassName('d');
    
    
    
    // Function to update the ticket count for a specific category
    function updateTicketCount(index, value) {
      tickets[index] = value;
      updateSummaryTable();
    }
    
    // Increment button for guests part
    for (let j = 0; j < incrementBtn.length; j++) {
      let button = incrementBtn[j];
     
    
      button.addEventListener('click', function (event) {
        let buttonClicked = event.target;
        let input = buttonClicked.parentElement.children[2];//parent element is [.box] and the children [2] is input field
        let inputV = input.value;
        let newV = parseInt(inputV) + 1;
        input.value = newV;
        updateTicketCount(j, newV);
      });
    }
    
    // Decrement button for guests part
    for (let j = 0; j < decrementBtn.length; j++) {
      let button = decrementBtn[j];
      button.addEventListener('click', function (event) {
        let buttonClicked = event.target;
        let input = buttonClicked.parentElement.children[2];
        let inputV = input.value;
        let newV = parseInt(inputV) - 1;
        if (newV >= 0) {
          input.value = newV;
          updateTicketCount(j, newV);
        }
      });
    }
    
    // Time Slot selection
    const selectBtn = document.querySelector('.select-btn'),
      slots = document.querySelectorAll('.slots');
    
    selectBtn.addEventListener("click", () => {
      selectBtn.classList.toggle('open');
    });
    
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        slot.classList.toggle("checked");
        updateSummaryTable();
      });
    });
    
    // Function to calculate the total amount for the selected time slots and tickets
    function calculateTotal() {
      const checkedSlots = document.querySelectorAll('.slots.checked');
      let numberOfTimeSlot = checkedSlots.length;
      let peak = 0;
    
      for (let j = 0; j < numberOfTimeSlot; j++) {
        const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
        if (slotText >= 4 && slotText <= 6) {
          peak++;
        }
        if (slotText >= 9 && slotText <= 11) {
            peak++;
          }
        
      }
    
      let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];
    
      let totalAmount = 0;
      for (let i = 0; i < tickettype.length; i++) {
        totalAmount += numberOfTimeSlot * (ticketprice[i] * tickets[i]) + (peakhourstotal[i] * tickets[i]);
      }
    
      return totalAmount;
    }
    




    // Function to update the summary table
    function updateSummaryTable() {
      let totalAmount = calculateTotal();
      let html = `
        <tr>
          <td>Date</td>
          <td></td>

          <tr>
          <tr>
          <td>Normal hours</td>
          <td>${calculateNormalHoursTotal()} Hours</td>
          <tr>

        </tr>
        <tr>
          <td>Peak hours</td>
          <td>${calculateTotalPeakHours()} Hours</td>
        </tr>
      `;
      
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i] > 0) {
          html += `
            <tr>
              <td>${tickettype[i]} x ${tickets[i]}</td>
              <td>${calculateCategoryTotal(i)}</td>
            </tr>
          `;
        }
      }
    
      html += `
        <tr>
          <th>Total Amount</th>
          <td>${totalAmount} USD</td>
        </tr>
    
      
      `
      ;
      localStorage.setItem('tabledetails',html);
      tbodyEl.innerHTML = html;
      saveTicketDataToLocalStorage();
    
      if (totalAmount > 0) {
        contBTN.removeAttribute('disabled');
      } else {
        contBTN.setAttribute('disabled', 'true');
      }
      
      
    }
    
    
    function redirectToDetailsPage() {
      const totalAmount = calculateTotal();
    
      
      if (totalAmount > 0) {
        window.location.href = 'details.html'; 
      }
    }
     
    
    contBTN.addEventListener('click', redirectToDetailsPage);
    
    // function to save data to local storage......................
    function saveTicketDataToLocalStorage() {
        const ticketData = {
          tickettype: tickettype,
          ticketprice: ticketprice,
          tickets: tickets
        };
      
        localStorage.setItem('ticketData', JSON.stringify(ticketData));
      }
    
     
    // Function to calculate the total amount for a specific category
    function calculateCategoryTotal(categoryIndex) {
      const checkedSlots = document.querySelectorAll('.slots.checked');
      let numberOfTimeSlot = checkedSlots.length;
      let peak = 0;
    
      for (let j = 0; j < numberOfTimeSlot; j++) {
        const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
        if (slotText >= 4 && slotText <= 6) {
          peak++;
        }
        if (slotText >= 9 && slotText <= 11) {
            peak++;
          }
        
    
      }
      
    
      let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];
    
      let totalAmount = numberOfTimeSlot * (ticketprice[categoryIndex] * tickets[categoryIndex]) + (peakhourstotal[categoryIndex] * tickets[categoryIndex]);
    
      return totalAmount;
    
    
      }
    
    // Function to calculate the total peak hours
    function calculateTotalPeakHours() {
      const checkedSlots = document.querySelectorAll('.slots.checked');
      let numberOfTimeSlot = checkedSlots.length;
      let peak = 0;
    
      for (let j = 0; j < numberOfTimeSlot; j++) {
        const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
        if (slotText >= 4 && slotText <= 6) {
          peak++;
        }
        if (slotText >= 9 && slotText <= 11) {
            peak++;
          }
      }
     localStorage.setItem("peakhrs",peak);
      return peak;
    }
    
    


    
    // Function to calculate the total amount for normal hours
function calculateNormalHoursTotal() {
    const checkedSlots = document.querySelectorAll('.slots.checked');
    let numberOfTimeSlot = checkedSlots.length;
    let normalHours = 0;
  
    for (let j = 0; j < numberOfTimeSlot; j++) {
      const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
      if ((slotText >= 1 && slotText <= 3) || (slotText >= 7 && slotText <= 8)) {
        normalHours++;
      }
    }
  
    let normalHoursTotal = normalHours ; // Adjust this based on your calculation logic
  
    return normalHoursTotal;
  }
  
  // Function to update the summary table with normal hours
  function updateSummaryTableWithNormalHours() {
    let totalAmount = calculateTotal();
    let normalHoursTotal = calculateNormalHoursTotal();
    let html = `
      <tr>
        <td>Date</td>
        <td></td>
      </tr>
      <tr>
        <td>Normal hours</td>
        <td>${calculateNormalHoursTotal} Hours</td>
      </tr>
      <tr>
        <td>Peak hours</td>
        <td>${calculateTotalPeakHours()} Hours</td>
      </tr>
    `;
  
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i] > 0) {
        html += `
          <tr>
            <td>${tickettype[i]} x ${tickets[i]}</td>
            <td>${calculateCategoryTotal(i)}</td>
          </tr>
        `;
      }
    }
  
    html += `
      <tr>
        <th>Total Amount</th>
        <td>${totalAmount} USD</td>
      </tr>
    `;
  
    localStorage.setItem('tabledetails', html);
    tbodyEl.innerHTML = html;
    saveTicketDataToLocalStorage();
  
    if (totalAmount > 0) {
      contBTN.removeAttribute('disabled');
    } else {
      contBTN.setAttribute('disabled', 'true');
    }
  }
  
  // Call this function when updating the summary table
  updateSummaryTableWithNormalHours();
    
    
    }








// Function to navigate to the next page
function navigateToNextPage() {
  // Replace 'next-page.html' with the actual URL of the next page
  window.location.href = 'details.html';
}

// Add a click event listener to the "Next Page" button
const nextPageBtn = document.getElementById('nextPageBtn');
nextPageBtn.addEventListener('click', navigateToNextPage);






function updateSummaryTable() {
  const selectedDate = new Date(localStorage.getItem('selectedDate'));
  const checkedSlots = document.querySelectorAll('.slots.checked');
  const numberOfTimeSlot = checkedSlots.length;
  let peak = 0;

  for (let j = 0; j < numberOfTimeSlot; j++) {
      const slotText = checkedSlots[j].querySelector('.slots-text').getAttribute('value');
      if (slotText >= 4 && slotText <= 6) {
          peak++;
      }
      if (slotText >= 9 && slotText <= 11) {
          peak++;
      }
  }

  let peakhourstotal = [peak * 2, peak, peak * 3, peak * 3, 0];

  let totalAmount = 0;
  for (let i = 0; i < tickets.length; i++) {
      totalAmount += numberOfTimeSlot * (ticketprice[i] * tickets[i]) + (peakhourstotal[i] * tickets[i]);
  }

  const normalHoursTotal = calculateNormalHoursTotal(selectedDate);

  let html = `
      <tr>
          <td>Date</td>
          <td>${selectedDate.toDateString()}</td>
      </tr>
      <tr>
          <td>Normal hours</td>
          <td>${normalHoursTotal} Hours</td>
      </tr>
      <tr>
          <td>Peak hours</td>
          <td>${calculateTotalPeakHours()} Hours</td>
      </tr>
  `;

  for (let i = 0; i < tickets.length; i++) {
      if (tickets[i] > 0) {
          const categoryTotal = calculateCategoryTotal(i, selectedDate);
          html += `
              <tr>
                  <td>${tickettype[i]} x ${tickets[i]}</td>
                  <td>${categoryTotal}</td>
              </tr>
          `;
      }
  }

  html += `
      <tr>
          <th>Total Amount</th>
          <td>${totalAmount} USD</td>
      </tr>
  `;

  localStorage.setItem('tabledetails', html);
  tbodyEl.innerHTML = html;
  saveTicketDataToLocalStorage();

  if (totalAmount > 0) {
      contBTN.removeAttribute('disabled');
  } else {
      contBTN.setAttribute('disabled', 'true');
  }
}













    }
  




  