// home-script.js
document.addEventListener('DOMContentLoaded', function () {
    const userEmail = localStorage.getItem('userEmail');
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userEmail; // Set the user's email

    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';
});

function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}
