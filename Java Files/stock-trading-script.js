// stock-trading-script.js
document.addEventListener('DOMContentLoaded', function () {
    var buySellForm = document.getElementById('buySellForm');
    var stockSymbolInput = document.getElementById('stockSymbol');
    var quantityInput = document.getElementById('quantity');
    var transactionTypeInput = document.getElementById('transactionType');
    var submitButton = document.getElementById('submitButton');

    // Check if the stored user email indicates an admin user
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Is admin:', isAdmin); 
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';

    // event listeners for form inputs
    buySellForm.addEventListener('input', function () {
        // Check if all inputs have values
        var allInputsFilled = stockSymbolInput.value.trim() !== '' &&
                              quantityInput.value.trim() !== '' &&
                              transactionTypeInput.value.trim() !== '';

        //  submit button based on input values
        submitButton.disabled = !allInputsFilled;
    });

    //  reset the form after submission
    buySellForm.addEventListener('submit', function () {
        // Reset form fields
        stockSymbolInput.value = '';
        quantityInput.value = '';
        transactionTypeInput.value = 'buy'; // Reset to default value
        submitButton.disabled = true; // Disable button again after submission
    });
});
