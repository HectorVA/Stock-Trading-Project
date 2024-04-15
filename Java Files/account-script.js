// account-script.js
function updateTotal(amount, transactionType) {
    // Use the userName from localStorage to identify the user
    const userName = localStorage.getItem('userName');

    // Set up the request body
    const requestBody = {
        userName: userName,
        amount: amount,
        transactionType: transactionType
    };

    // Send the deposit or withdrawal to the server
    fetch('http://52.53.164.57:3000/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            // If the transaction is successful, update the displayed total
            totalAmount = data.newBalance; // Assuming the server sends back the new balance
            totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
        } else {
            // Handle any errors, such as transaction failing due to insufficient funds
            alert('Transaction failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the transaction.');
    });
}



document.addEventListener('DOMContentLoaded', function () {
    var depositForm = document.getElementById('depositForm');
    var withdrawForm = document.getElementById('withdrawForm');
    var portfolioSection = document.querySelector('.container.account-section .account-function .portfolio');
    var totalAmountDiv = document.getElementById('totalAmount');

    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';

    const userName = localStorage.getItem('userName');

    if (userName) {
        fetch('http://52.53.164.57:3000/balance'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: userName })
        }
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the displayed total with the fetched balance
                const totalAmountDiv = document.getElementById('totalAmount');
                const totalAmount = data.balance;
                totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
            } else {
                alert('Failed to fetch balance');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the balance.');
        });
    } else {
        console.error('UserName not found in localStorage');
    }


    // Initialize the total amount
    var totalAmount = 0;

    depositForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var depositAmount = parseFloat(document.getElementById('depositAmount').value);

        updatePortfolio('Deposit', depositAmount);
        updateTotal(depositAmount);

        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);

        updatePortfolio('Withdraw', withdrawAmount);
        updateTotal(-withdrawAmount);

        withdrawForm.reset();
    });

    function updatePortfolio(transactionType, amount) {
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

    function updateTotal(amount) {
        totalAmount += amount;
        totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
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
