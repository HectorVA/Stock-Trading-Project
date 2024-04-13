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

                var isAdmin = userName.includes('@admin.tradewise.com');

                var redirectUrl = 'home.html?username=' + encodeURIComponent(userName);
                if (isAdmin) {
                    redirectUrl += '&isAdmin=true';
                }
                window.location.href = redirectUrl;
               
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
    });
});
