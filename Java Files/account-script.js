// account-script.js
function updateTotal(amount, transactionType) {
    // Use the userName from localStorage to identify the user
    const userName = localStorage.getItem('userName');

    // Set up the request body
    const requestBody = {
        userName: userName,
        amount: amount,
        transactionType: transactionType
    };};

    // Send the deposit or withdrawal to the server
    fetch('http://52.53.164.57:3000/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userName,
            amount: amount,
            transactionType: transactionType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the displayed total with the new balance returned from the server
            updateDisplayedTotal(data.newBalance);
            addTransactionToPortfolio(transactionType, amount);
        } else {
            alert('Transaction failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the transaction.');
    });


const userName = localStorage.getItem('userName');

if (userName) {
    // Note: No need to set headers or body for a GET request
    fetch(`http://54.176.181.88:3000/balance?userName=${encodeURIComponent(userName)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Update the displayed total with the fetched balance
            const totalAmountDiv = document.getElementById('totalAmount');
            const totalAmount = data.balance;
            totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
        } else {
            alert('Failed to fetch balance: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching the balance.');
    });
} else {
    console.error('UserName not found in localStorage');
}

// Function to add a transaction to the portfolio display
function addTransactionToPortfolio(transactionType, amount) {
    var transactionItem = document.createElement('div');
    transactionItem.classList.add('transaction-item');
    var date = new Date().toLocaleDateString();
    transactionItem.innerHTML = `
        <p>Date: ${date}</p>
        <p>Transaction Type: ${transactionType}</p>
        <p>Amount: $${amount.toFixed(2)}</p>
    `;
    portfolioSection.appendChild(transactionItem);
}

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function () {
    portfolioSection = document.querySelector('.container.account-section .account-function .portfolio');
    initializeBalance(); // Get initial balance from the server
    
    const depositForm = document.getElementById('depositForm');
    const withdrawForm = document.getElementById('withdrawForm');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';
    
    depositForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var depositAmount = parseFloat(document.getElementById('depositAmount').value);
        var userName = localStorage.getItem('userName');
        updateTotalOnServer(depositAmount, 'deposit', userName);
        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
        var userName = localStorage.getItem('userName');
        updateTotalOnServer(withdrawAmount, 'withdraw', userName);
        withdrawForm.reset();
    });
});

// Logout Function
function logout() {
    localStorage.clear(); // Clears all local storage data
    window.location.href = 'index.html'; // Redirects to the login page
};
