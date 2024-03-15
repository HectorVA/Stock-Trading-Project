// index-script.js
document.addEventListener('DOMContentLoaded', function () {
    var createAccountForm = document.getElementById('createAccountForm');
    var submitCreateAccountButton = document.getElementById('submitCreateAccountButton');

    // Add event listener to the create account form inputs
    createAccountForm.addEventListener('input', function () {
        // Check if all inputs have values
        var allInputsFilled = firstName.value.trim() !== '' &&
                              lastName.value.trim() !== '' &&
                              userName.value.trim() !== '' &&
                              email.value.trim() !== '' &&
                              password.value.trim() !== '';

        // Enable submit button based on input values
        submitCreateAccountButton.disabled = !allInputsFilled;
    });

    //  reset the form after submission
    createAccountForm.addEventListener('submit', function (event) {
        // Reset form fields
        firstName.value = '';
        lastName.value = '';
        userName.value = '';
        email.value = '';
        password.value = '';
        submitCreateAccountButton.disabled = true; // Disable button again after submission

        // Prevent the form from submitting (For revenger to handle form submission differently)
        event.preventDefault();
    });

    var loginForm = document.getElementById('loginForm');
    var loginButton = document.getElementById('loginButton');
    var loginUserName = document.getElementById('loginUserName');
    var loginPassword = document.getElementById('loginPassword');

    // Add event listener to the login form inputs
    loginForm.addEventListener('input', function () {
        // Check if all inputs have values
        var loginInputsFilled = loginUserName.value.trim() !== '' &&
                                loginPassword.value.trim() !== '';

        //  login button based on input values
        loginButton.disabled = !loginInputsFilled;
    });

    //  reset the form after submission
    loginForm.addEventListener('submit', function (event) {
        // Reset form fields
        loginUserName.value = '';
        loginPassword.value = '';
        loginButton.disabled = true; // Disable button again after submission

        // Prevent the form from submitting (For revenger to handle form submission differently)
        event.preventDefault();
    });
});
