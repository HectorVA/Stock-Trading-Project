document.addEventListener('DOMContentLoaded', function () {
    var loginButton = document.getElementById('loginButton');
    var loginUserName = document.getElementById('loginUserName');
    var loginPassword = document.getElementById('loginPassword');

    // Initially disable the login button
    loginButton.disabled = true;

    document.getElementById('loginForm').addEventListener('input', function () {
        // Enable the login button if both fields have some input
        loginButton.disabled = loginUserName.value.trim() === '' || loginPassword.value.trim() === '';
    });
});

// Define the login function as called from the HTML
function login() {
    event.preventDefault(); // Prevent the form from submitting traditionally

    var email = document.getElementById('loginUserName').value;
    var password = document.getElementById('loginPassword').value;

    if (email.includes('admin@') && password) {
        document.getElementById('adminLink').style.display = 'block'; // Show the admin link if conditions are met
        alert('Logged in as admin!');
    } else if (password) {
        alert('Logged in successfully!');
    } else {
        alert('Please enter a password!');
    }

    // Optionally reset the form fields here if needed
}

