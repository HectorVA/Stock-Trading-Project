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

        fetch('http://52.53.164.57:3000/create-account', {
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
    
        fetch('http://52.53.164.57:3000/login', {
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
                localStorage.setItem('userName', data.userName);
                // Check that Email exists in the data object before using it
                if (data.Email) {
                    localStorage.setItem('userEmail', data.Email);
        
                    if (data.Email.includes('@admin.tradewise.com')) {
                        localStorage.setItem('isAdmin', 'true');
                    } else {
                        localStorage.setItem('isAdmin', 'false');
                    }
                } else {
                    console.error('Email not provided in the response.');
                }
                
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