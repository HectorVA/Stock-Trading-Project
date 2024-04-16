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

document.addEventListener('DOMContentLoaded', function () {

    
    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';

    var createStockForm = document.querySelector('.container.admin-section .admin-function:nth-child(1) form');
    var changeMarketHoursForm = document.querySelector('.container.admin-section .admin-function:nth-child(2) form');
    var changeMarketScheduleForm = document.querySelector('.container.admin-section .admin-function:nth-child(3) form');

    
    
    createStockForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var companyName = document.getElementById('companyName').value;
        var stockTicker = document.getElementById('stockTicker').value;
        var volume = parseFloat(document.getElementById('volume').value);
        var initialPrice = parseFloat(document.getElementById('initialPrice').value);

        // Placeholder for creating a new stock
        createNewStock(companyName, stockTicker, volume, initialPrice);

        // Clear the form
        createStockForm.reset();
    });

    changeMarketHoursForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var newMarketHours = document.getElementById('newMarketHours').value;

        // Placeholder for changing market hours
        changeMarketHours(newMarketHours);

        // Clear the form
        changeMarketHoursForm.reset();
    });

    changeMarketScheduleForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var newMarketSchedule = document.getElementById('newMarketSchedule').value;

        // Placeholder for changing market schedule
        changeMarketSchedule(newMarketSchedule);

        // Clear the form
        changeMarketScheduleForm.reset();
    });

    // Placeholder functions for actual implementation
    function createNewStock(companyName, stockTicker, volume, initialPrice) {
        // Implement logic to create a new stock
        console.log(`Creating new stock: ${companyName}, ${stockTicker}, ${volume}, ${initialPrice}`);
    }

    function changeMarketHours(newMarketHours) {
        // Implement logic to change market hours
        console.log(`Changing market hours to: ${newMarketHours}`);
    }

    function changeMarketSchedule(newMarketSchedule) {
        // Implement logic to change market schedule
        console.log(`Changing market schedule to: ${newMarketSchedule}`);
    }

    
});

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}