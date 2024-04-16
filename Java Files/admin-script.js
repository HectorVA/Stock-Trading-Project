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


});

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}