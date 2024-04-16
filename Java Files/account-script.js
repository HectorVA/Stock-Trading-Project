// account-script.js
let portfolioSection;

// Helper function to update the displayed total balance
function updateDisplayedTotal(newBalance) {
    const totalAmountDiv = document.getElementById('totalAmount');
    if (totalAmountDiv) {
        totalAmountDiv.textContent = `${newBalance.toFixed(2)}`;
    }
}

 // Function to update the total on the server
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
        if (data.success) {
            // Assuming the server returns the new balance
            updateDisplayedTotal(data.balance);
            addTransactionToPortfolio(transactionType, amount);
        } else {
            alert('Transaction failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the transaction.');
    });
}

// Function to fetch the initial balance and display it
function initializeBalance() {
    const userName = localStorage.getItem('userName');

    if (userName) {
        fetch(`http://54.176.181.88:3000/balance?userName=${encodeURIComponent(userName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateDisplayedTotal(data.balance);
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
    
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminLink = document.getElementById('adminLink');
    if (adminLink) {
        adminLink.style.display = isAdmin ? 'block' : 'none';
    }

    const depositForm = document.getElementById('depositForm');
    const withdrawForm = document.getElementById('withdrawForm');
    
    depositForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var depositAmount = parseFloat(document.getElementById('depositAmount').value);
        updateTotalOnServer(depositAmount, 'deposit', localStorage.getItem('userName'));
        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
        updateTotalOnServer(withdrawAmount, 'withdraw', localStorage.getItem('userName'));
        withdrawForm.reset();
    });
});

// Logout Function
function logout() {
    localStorage.clear(); // Clears all local storage data
    window.location.href = 'index.html'; // Redirects to the login page
};