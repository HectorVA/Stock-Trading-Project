// home-script.js
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve stored user data
    const userEmail = localStorage.getItem('userEmail');
    const username = localStorage.getItem('userName'); // Retrieve the username from localStorage
    const userNameElement = document.getElementById('userName');

    // Set the display content to username if available, otherwise use email
    userNameElement.textContent = username || userEmail; 

    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';


    if (username) {
        // Fetch balance from the server using the /balance endpoint
        fetch(`http://54.176.181.88:3000/balance?userName=${encodeURIComponent(username)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.balance !== undefined) {
                if (data.success && data.balance !== undefined) {
                    // Format the balance as a currency
                    const formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2
                    });
                    const formattedBalance = formatter.format(data.balance);}
                // Update the Purchasing Power element with the fetched balance
                const purchasingPowerElement = document.getElementById('purchasingPower');
                purchasingPowerElement.textContent = formattedBalance;
                purchasingPowerElement.textContent = `$${data.balance.toFixed(2)}`;
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

});

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}
