// index-script.js
document.addEventListener('DOMContentLoaded', function () {
    var createAccountForm = document.getElementById('createAccountForm');
    var loginForm = document.getElementById('loginForm');
    
    createAccountForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var userName = document.getElementById('userName').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        
        // Check if the stored user email indicates an admin user
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        console.log('Is admin:', isAdmin); 
        document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';

        fetch('http://127.0.0.1:3000/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                Username: userName,
                Email: email,
                Password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Account created successfully!');
                createAccountForm.reset();
            } else {
                alert('Account creation failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the account.');
        });
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        var userName = document.getElementById('loginUserName').value;
        var password = document.getElementById('loginPassword').value;
    
        fetch('http://54.176.181.88:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: userName,
                Password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Logged in successfully!');
                localStorage.setItem('userName', data.username);
                localStorage.setItem('userEmail', data.email); 
                localStorage.setItem('isAdmin', data.isAdmin);
                localStorage.setItem('firstName', data.firstName);
                localStorage.setItem('lastName', data.lastName);
                
        
                // Redirect to home.html after successful login
                window.location.href = 'home.html';
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please check your internet connection and try again.');
        });
    });
});