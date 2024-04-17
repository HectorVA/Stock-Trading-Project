// admin-script.js

function toggleMenu() {
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('showMenu'); // This toggles the class on and off
}

function createNewStock(companyName, stockTicker, volume, initialPrice) {
    // Construct the data object you will send to the server
    const stockData = {
        Symbol: stockTicker,
        Name: companyName,
        Available_Shares: volume,
        Price_Per_Share: initialPrice // Assuming your server expects this field for setting initial price
    };
    
    // Make a fetch POST request to your server's endpoint for creating new stocks
    fetch('http://54.176.181.88:3000/create_stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // You could refresh the stocks displayed or inform the user of success here
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// This function will check if trading is allowed based on local time
function isTradingAllowed() {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Check if today is a holiday
    let holidays = JSON.parse(localStorage.getItem('holidays')) || [];
    if (holidays.includes(today)) {
        return false; // Trading is not allowed on holidays
    }

    const marketHoursEnabled = localStorage.getItem('marketHoursEnabled') === 'true';
    if (!marketHoursEnabled) {
        return true; // Market hour restrictions are disabled, allow trading
    }

    const hour = now.getHours();
    const day = now.getDay();

    // Check if the current time is within market hours: 7 AM to 2 PM, Monday (1) to Friday (5)
    return hour >= 7 && hour < 14 && day >= 1 && day <= 5;
}

// Function to toggle market hours restriction
function toggleMarketHours() {
    const marketHoursEnabled = localStorage.getItem('marketHoursEnabled') === 'true';
    localStorage.setItem('marketHoursEnabled', !marketHoursEnabled);

    // Update the button text based on the new state
    const toggleBtn = document.getElementById('toggleMarketHoursBtn');
    if (!marketHoursEnabled) {
        toggleBtn.textContent = 'Enable Outside Market Trading';
    } else {
        toggleBtn.textContent = 'Disable Outside Market Trading';
    }
}

// Function to add a holiday
function setHoliday() {
    const selectedDate = document.getElementById('holidayPicker').value;
    if (selectedDate) {
        // Store the selected date as a holiday
        let holidays = JSON.parse(localStorage.getItem('holidays')) || [];
        holidays.push(selectedDate);
        localStorage.setItem('holidays', JSON.stringify(holidays));

        alert(`Holiday set for ${selectedDate}`);
        // Optionally, you can update the UI to reflect the new holiday
    } else {
        alert('Please select a date to set as a holiday.');
    }
}

// Function to remove the selected holiday
function removeHoliday() {
    const selectBox = document.getElementById('upcomingHolidays');
    const selectedDate = selectBox.value;
    let holidays = JSON.parse(localStorage.getItem('holidays')) || [];
    
    // Remove the selected date from the holidays array
    holidays = holidays.filter(date => date !== selectedDate);
    localStorage.setItem('holidays', JSON.stringify(holidays));
    
    // Update the holiday list in the UI
    updateHolidayList();
    alert(`Holiday removed for ${selectedDate}`);
}

function updateHolidayList() {
    const selectBox = document.getElementById('upcomingHolidays');
    selectBox.innerHTML = ''; // Clear existing options
    const holidays = JSON.parse(localStorage.getItem('holidays')) || [];
    
    holidays.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        selectBox.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('setHolidayBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission
        setHoliday(); // Call the setHoliday function when clicked
    });

    // Attach event listener to 'Remove Holiday' button
    document.getElementById('removeHolidayBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission
        removeHoliday(); // Call the removeHoliday function when clicked
    });

    // Populate the holiday list on page load
    updateHolidayList();

    // Set initial state of the market hours button based on stored value
    const marketHoursEnabled = localStorage.getItem('marketHoursEnabled') === 'true';
    const toggleBtn = document.getElementById('toggleMarketHoursBtn');
    toggleBtn.textContent = marketHoursEnabled ? 'Enable Outside Market Trading' : 'Disable Outside Market Trading';
    toggleBtn.addEventListener('click', toggleMarketHours);
    
    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';
 
     var createStockForm = document.querySelector('.container.admin-section .admin-function:nth-child(1) form');
     // ... other form variables and event listeners ...
 
     createStockForm.addEventListener('submit', function (event) {
         event.preventDefault(); // Prevent default form submission
 
         // Get form data
         var companyName = document.getElementById('companyName').value;
         var stockTicker = document.getElementById('stockTicker').value;
         var volume = parseFloat(document.getElementById('volume').value);
         var initialPrice = parseFloat(document.getElementById('initialPrice').value);
 
         // Call the function to create a new stock
         createNewStock(companyName, stockTicker, volume, initialPrice);
 
         // Clear the form
         createStockForm.reset();
     });

});

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}