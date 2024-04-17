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
    const marketHoursEnabled = localStorage.getItem('marketHoursEnabled') === 'true';
    if (!marketHoursEnabled) {
        return true; // Market hour restrictions are disabled
    }

    const now = new Date();
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

document.addEventListener('DOMContentLoaded', function () {

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