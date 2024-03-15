// admin-script.js

document.addEventListener('DOMContentLoaded', function () {
    var createStockForm = document.querySelector('.container.admin-section .admin-function:nth-child(1) form');
    var changeMarketHoursForm = document.querySelector('.container.admin-section .admin-function:nth-child(2) form');
    var changeMarketScheduleForm = document.querySelector('.container.admin-section .admin-function:nth-child(3) form');

    createStockForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var companyName = document.getElementById('companyName').value;
        var stockTicker = document.getElementById('stockTicker').value;
        var volume = parseFloat(document.getElementById('volume').value);
        var initialPrice = parseFloat(document.getElementById('initialPrice').value);

        // Placeholder for creating a new stock
        createNewStock(companyName, stockTicker, volume, initialPrice);

        // Clear the form
        createStockForm.reset();
    });

    changeMarketHoursForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var newMarketHours = document.getElementById('newMarketHours').value;

        // Placeholder for changing market hours
        changeMarketHours(newMarketHours);

        // Clear the form
        changeMarketHoursForm.reset();
    });

    changeMarketScheduleForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var newMarketSchedule = document.getElementById('newMarketSchedule').value;

        // Placeholder for changing market schedule
        changeMarketSchedule(newMarketSchedule);

        // Clear the form
        changeMarketScheduleForm.reset();
    });

    // Placeholder functions for actual implementation
    function createNewStock(companyName, stockTicker, volume, initialPrice) {
        // Implement logic to create a new stock
        console.log(`Creating new stock: ${companyName}, ${stockTicker}, ${volume}, ${initialPrice}`);
    }

    function changeMarketHours(newMarketHours) {
        // Implement logic to change market hours
        console.log(`Changing market hours to: ${newMarketHours}`);
    }

    function changeMarketSchedule(newMarketSchedule) {
        // Implement logic to change market schedule
        console.log(`Changing market schedule to: ${newMarketSchedule}`);
    }
});
