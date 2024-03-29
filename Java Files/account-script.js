// account-script.js
document.addEventListener('DOMContentLoaded', function () {
    var depositForm = document.getElementById('depositForm');
    var withdrawForm = document.getElementById('withdrawForm');
    var portfolioSection = document.querySelector('.container.account-section .account-function .portfolio');
    var totalAmountDiv = document.getElementById('totalAmount');

    // Initialize the total amount
    var totalAmount = 0;

    depositForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var depositAmount = parseFloat(document.getElementById('depositAmount').value);

        updatePortfolio('Deposit', depositAmount);
        updateTotal(depositAmount);

        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);

        updatePortfolio('Withdraw', withdrawAmount);
        updateTotal(-withdrawAmount);

        withdrawForm.reset();
    });

    function updatePortfolio(transactionType, amount) {
        var transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction-item');

        var date = new Date().toLocaleDateString();
        transactionItem.innerHTML = `
            <p>Date: ${date}</p>
            <p>Transaction Type: ${transactionType}</p>
            <p>Amount: $${amount.toFixed(2)}</p>
        `;

        portfolioSection.appendChild(transactionItem);
    }

    function updateTotal(amount) {
        totalAmount += amount;
        totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`;
    }
});
