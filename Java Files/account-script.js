// account-script.js
const totalAmountDiv = document.getElementById('totalAmount');
let totalAmount = 0; // This also needs to be in the wider scope if other functions will access it
let portfolioSection;

function updateDisplayedTotal(newBalance) {
    totalAmount = newBalance; // Update the global total amount
    totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`; // Update the display
}

function updateTotalFromServer(newBalance) {
    totalAmount = newBalance; // Assuming the server sends back the new balance
    totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
}

// Update after deposit
depositForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var depositAmount = parseFloat(document.getElementById('depositAmount').value);
    // Assuming the userName is stored in localStorage
    var userName = localStorage.getItem('userName');
    updateTotal(depositAmount, 'deposit', userName);
});

// Update after withdrawal
withdrawForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
    // Assuming the userName is stored in localStorage
    var userName = localStorage.getItem('userName');
    updateTotal(withdrawAmount, 'withdraw', userName);
});

function updateTotalOnServer(amount, transactionType, userName) {
    fetch('http://54.176.181.88:3000/transaction', {
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
        if(data.success) {
            // Update the displayed total with the new balance returned from the server
            updateTotalFromServer(data.newBalance);
            updatePortfolio(transactionType, amount);
        } else {
            alert('Transaction failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the transaction.');
    });
}
// Define a function to initialize the balance
function initializeBalance() {
    const userName = localStorage.getItem('userName');
    if (userName) {
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
                updateTotalFromServer(data.balance);
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
        // Redirect to login page or show appropriate message
    }
}

function updatePortfolio(transactionType, amount) {
    var transactionItem = document.createElement('div');
    transactionItem.classList.add('transaction-item');

    var date = new Date().toLocaleDateString();
    transactionItem.innerHTML = `
        <p>Date: ${date}</p>
        <p>Transaction Type: ${transactionType}</p>
        <p>Amount: $${amount.toFixed(2)}</p>
    `;

    // Assuming portfolioSection is globally accessible
    var portfolioSection = document.querySelector('.container.account-section .account-function .portfolio');
    portfolioSection.appendChild(transactionItem);
}

function updateTotal(amount) {
    // Assuming totalAmountDiv is globally accessible
    var totalAmountDiv = document.getElementById('totalAmount');
    totalAmount += amount;
    totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Define the sections of the portfolio and total amount once the DOM is fully loaded
    portfolioSection = document.querySelector('.container.account-section .account-function .portfolio');
    totalAmountDiv = document.getElementById('totalAmount');

    // Initialize the total amount with the value from the server
    initializeBalance();

    // Reference to form elements
    var depositForm = document.getElementById('depositForm');
    var withdrawForm = document.getElementById('withdrawForm');

    // Check admin status
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';

    // Event listener for deposit form submission
    depositForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var depositAmount = parseFloat(document.getElementById('depositAmount').value);
        var userName = localStorage.getItem('userName');
        updateTotalOnServer(depositAmount, 'deposit', userName); // This function sends the deposit to the server
        depositForm.reset(); // Reset the form after submitting
    });

    // Event listener for withdraw form submission
    withdrawForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
        var userName = localStorage.getItem('userName');
        updateTotalOnServer(withdrawAmount, 'withdraw', userName); // This function sends the withdrawal to the server
        withdrawForm.reset(); // Reset the form after submitting
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
