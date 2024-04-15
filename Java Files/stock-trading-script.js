// stock-trading-script.js
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

    fetchStocks(); // Initial fetch
    setInterval(fetchStocks, 10000);        

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
});

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}

function fetchStocks() {
    fetch('http://52.53.164.57:3000/stocks')
        .then(response => response.json())
        .then(stocks => {
            updateStockDisplay(stocks);
        })
        .catch(error => console.error('Error fetching stocks:', error));
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
