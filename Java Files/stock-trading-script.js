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
        fetch('/api/stocks')
            .then(response => response.json())
            .then(stocks => {
                updateStockDisplay(stocks);
            })
            .catch(error => console.error('Error fetching stocks:', error));
    } else {
        logout();
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
            <p>Opening Price: $${stock.Opening_Price}</p>
            <p>Price: $${stock.Price_Per_Share}</p>
            <p>Volume: ${stock.Available_Shares}</p>
            <p>High: $${stock.High}</p>
            <p>Low: $${stock.Low}</p>
            <!-- More details here -->
        `;
        stockInfoDiv.appendChild(stockDiv);
    });
}

function buyStock(userName, stockSymbol, quantity) {
    if (!isTradingAllowed()) {
        alert('Trading is currently not allowed outside market hours.');
        return; // Exit the function if trading is not allowed
    }
    if (!confirm(`Are you sure you want to buy ${quantity} shares of ${stockSymbol}?`)) {
        console.log('Purchase cancelled by the user.');
        return; // Exit the function if the user cancels the confirmation dialog
    }
    fetch('/api/buy-stock', {
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

function sellStock(userName, stockSymbol, quantity) {
    if (!isTradingAllowed()) {
        alert('Trading is currently not allowed outside market hours.');
        return; // Exit the function if trading is not allowed
    }
    if (!confirm(`Are you sure you want to sell ${quantity} shares of ${stockSymbol}?`)) {
        console.log('Sale cancelled by the user.');
        return; // Exit the function if the user cancels the confirmation dialog
    }
    fetch('/api/sell-stock', {
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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Stock sold successfully!');
            // Optionally, refresh the stock list or update user's balance display
            fetchStocks(); 
        } else {
            alert('Failed to sell stock: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error selling stock:', error);
        alert('An error occurred while selling the stock.');
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

    buySellForm.addEventListener('input', function () {
        var allInputsFilled = stockSymbolInput.value.trim() !== '' &&
                              quantityInput.value.trim() !== '' &&
                              transactionTypeInput.value.trim() !== '';
        submitButton.disabled = !allInputsFilled;
    });

    buySellForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const userName = localStorage.getItem('userName');
        const stockSymbol = stockSymbolInput.value;
        const quantity = parseInt(quantityInput.value, 10);
        const transactionType = transactionTypeInput.value;

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        if (transactionType === 'buy') {
            buyStock(userName, stockSymbol, quantity);
        } else if (transactionType === 'sell') {
            sellStock(userName, stockSymbol, quantity);
        }

        // Reset form fields after the operation
        stockSymbolInput.value = '';
        quantityInput.value = '';
        transactionTypeInput.value = 'buy';
    });
});
