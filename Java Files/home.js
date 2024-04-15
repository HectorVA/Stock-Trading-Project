// home-script.js
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve stored user data (if any)
    var userEmail = localStorage.getItem('userEmail');

    // Check if the stored user email indicates an admin user
    if (userEmail && userEmail.includes('@admin.tradewise.com')) {
        document.getElementById('adminLink').style.display = 'block';
    } else {
        document.getElementById('adminLink').style.display = 'none';
    }

    // Other post-login initialization code can go here
});
