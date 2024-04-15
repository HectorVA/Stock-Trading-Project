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
});

function logout() {
    // Clear all relevant data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    // Redirect to index.html
    window.location.href = 'index.html';
}