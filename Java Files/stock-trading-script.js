// stock-trading-script.js
function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}

function fetchStocks() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        fetch('http://54.176.181.88:3000/stocks')
            .then(response => response.json())
            .then(stocks => {
                updateStockDisplay(stocks);
            })
            .catch(error => console.error('Error fetching stocks:', error));
    } else {
        logout(); // User is not logged in, so log them out
    }
}


function updateStockDisplay(stocks) {
    const stockInfoDiv = document.querySelector('.stock-info');
    stockInfoDiv.innerHTML = ''; // Clear existing content
    stocks.forEach(stock => {
        const stockDiv = document.createElement('div');
        stockDiv.classList.add('stock');
        stockDiv.innerHTML = `
            <h3>Stock Ticker: ${stock.Symbol}</h3>
            <p>Price: $${stock.Price_Per_Share}</p>
            <p>Volume: ${stock.Available_Shares}</p>
            <!-- More details here -->
        `;
        stockInfoDiv.appendChild(stockDiv);
    });
}

function buyStock(userName, stockSymbol, quantity) {
    fetch('http://54.176.181.88:3000/buy-stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userName,
            symbol: stockSymbol,
            quantity: quantity
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Stock purchased successfully!');
            fetchStocks(); // Re-fetch stocks to update the display
        } else {
            alert('Failed to purchase stock: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error purchasing stock:', error);
        alert('An error occurred while purchasing the stock.');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var buySellForm = document.getElementById('buySellForm');
    var stockSymbolInput = document.getElementById('stockSymbol');
    var quantityInput = document.getElementById('quantity');
    var transactionTypeInput = document.getElementById('transactionType');
    var submitButton = document.getElementById('submitButton');

    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';

    if (localStorage.getItem('userEmail')) {
        fetchStocks(); // Fetch stocks once initially
        setInterval(fetchStocks, 5000); // Set up the interval to fetch stocks
    } else {
        logout(); // Not logged in, so log the user out
    }      

    // event listeners for form inputs
    buySellForm.addEventListener('input', function () {
        // Check if all inputs have values
        var allInputsFilled = stockSymbolInput.value.trim() !== '' &&
                              quantityInput.value.trim() !== '' &&
                              transactionTypeInput.value.trim() !== '';

        //  submit button based on input values
        submitButton.disabled = !allInputsFilled;
    });

    //  reset the form after submission
    buySellForm.addEventListener('submit', function () {
        // Reset form fields
        stockSymbolInput.value = '';
        quantityInput.value = '';
        transactionTypeInput.value = 'buy'; // Reset to default value
        submitButton.disabled = true; // Disable button again after submission
    });


    buySellForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const userName = localStorage.getItem('userName'); // Assume userName is stored in localStorage
        const stockSymbol = document.getElementById('stockSymbol').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const transactionType = document.getElementById('transactionType').value;

        // Only proceed if transactionType is 'buy'; adjust accordingly for 'sell'
        if (transactionType === 'buy') {
            buyStock(userName, stockSymbol, quantity);
        } else {
            // Handle sell operation if needed
            console.log('Sell operation not implemented yet');
        }
    });
});






