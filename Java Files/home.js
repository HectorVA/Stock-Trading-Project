// home-script.js
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve stored user data
    const username = localStorage.getItem('userName'); 
    const totalStockValueElement = document.getElementById('totalStockValue');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const fullNameElement = document.getElementById('fullName');
    
    if (firstName && lastName) {
        // Set the display content to 'First Last' format
        fullNameElement.textContent = `${firstName} ${lastName}`;
    } else {
        console.error('First name or last name not found in localStorage');
        // Handle the case where there is no first name or last name in localStorage, maybe redirect to login
    }
    
    

    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';


    if (username) {
        // Fetch balance from the server using the /balance endpoint
        fetch(`http://ec2-13-56-193-85.us-west-1.compute.amazonaws.com/api/balance?userName=${encodeURIComponent(username)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.balance !== undefined) {
                // Format the balance as a currency
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                });
                const formattedBalance = formatter.format(data.balance);
                // Update the Purchasing Power element with the formatted balance
                const purchasingPowerElement = document.getElementById('purchasingPower');
                if (formattedBalance === "$0.00") {
                    purchasingPowerElement.textContent = "You're broke, kid";
                } else {
                    purchasingPowerElement.textContent = formattedBalance;
                }
            } else {
                console.error('Failed to fetch balance: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.error('Username not found in localStorage');
        // Handle the case where there is no username in localStorage
    }

    if (username) {
        fetch(`http://ec2-13-56-193-85.us-west-1.compute.amazonaws.com/api/portfolio?userName=${encodeURIComponent(username)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const positiveStocks = data.portfolio.filter(stock => stock.totalShares > 0);
                const portfolioSection = document.querySelector('.portfolio ul');
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                });

                // Clear any existing list items
                portfolioSection.innerHTML = '';

                // Generate and append new list items
                positiveStocks.forEach(stock => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${stock.symbol} - Quantity: ${stock.totalShares}, Value: ${formatter.format(stock.totalValue)}`;
                    portfolioSection.appendChild(listItem);
                });

                // Update the Total Stock Value in the Balance section
                const totalValue = positiveStocks.reduce((acc, stock) => acc + stock.totalValue, 0);
                totalStockValueElement.textContent = `Total Stock Value: ${formatter.format(totalValue)}`;
            } else {
                console.error('Failed to fetch portfolio: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching portfolio:', error);
        });
    } else {
        console.error('Username not found in localStorage');
        // Redirect the user or handle the missing username as appropriate
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