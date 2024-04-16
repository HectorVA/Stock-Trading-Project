// history.js
    document.addEventListener('DOMContentLoaded', function () {
        // Check if the stored user email indicates an admin user
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const userName = localStorage.getItem('userName');
    
        document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';
        
        if (userName) {
            fetchTransactionHistory(userName);
        } else {
            console.error('No userName found in localStorage');
        }
    });
    
    function fetchTransactionHistory(userName) {
        fetch(`http://54.176.181.88:3000/user-transactions?userName=${encodeURIComponent(userName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(transactions => {
            displayTransactionHistory(transactions);
        })
        .catch(error => {
            console.error('Error fetching transaction history:', error);
        });
    }
    
    function displayTransactionHistory(transactions) {
        const historyDiv = document.querySelector('.result-section');
        historyDiv.innerHTML = ''; // Clear any existing content
    
        transactions.forEach(transaction => {
            const transactionItem = document.createElement('div');
            transactionItem.classList.add('transaction-item');
            transactionItem.innerHTML = `
                <p>Date: ${transaction.Date}</p>
                <p>Transaction Type: ${transaction.Transaction_Type}</p>
                <p>Stock: ${transaction.Symbol}</p>
                <p>Quantity: ${transaction.Quantity_Of_Shares}</p>
                <p>Price: $${transaction.Price_Per_Share.toFixed(2)}</p>
                <p>Total: $${transaction.Transaction_Total.toFixed(2)}</p>
            `;
            historyDiv.appendChild(transactionItem);
        });
    }

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}