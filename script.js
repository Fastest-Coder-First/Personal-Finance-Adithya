//Create a web-based personal finance tracker using JavaScript, HTML, and CSS. The application should allow users to add, edit, and delete income and expense transactions and display the current balance.
//The application should also display the total income and expenses. The application should be able to store the data in the browser's local storage and retrieve it when the application is opened again.
//The application should also be able to display the data in a chart.
//The application should be responsive and work on mobile devices.
//The application should be deployed to a hosting service such as GitHub Pages so that it can be accessed by anyone.
//The application should be tested using the Chrome DevTools Lighthouse feature to ensure that it is accessible and performs well.

function init() {    
    //get data from local storage
    var storedData = JSON.parse(localStorage.getItem("data"));
    //if data is not null, set the data to the global variable data
    if (storedData !== null) {
        data = storedData;
    }
    //display data
    displayData();
    //display chart
    displayChart();
}

//global variables
var data = [];
var totalIncome = 0;
var totalExpense = 0;
var balance = 0;

//function to add transaction
function addTransaction() {
    //get input values
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var type = document.getElementById("type").value;
    //validate input values
    if (description === "" || amount === "" || type === "") {
        alert("Please enter a description, amount, and type.");
        return;
    }
    //create new transaction object
    var transaction = {
        description: description,
        amount: amount,
        type: type
    };
    //add transaction to data
    data.push(transaction);
    //clear input values
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "";
    //display data
    displayData();
    //display chart
    displayChart();
    //save data to local storage
    localStorage.setItem("data", JSON.stringify(data));
}

//function to display data
function displayData() {
    //get table body
    var tableBody = document.getElementById("table-body");
    //clear table body
    tableBody.innerHTML = "";

        //loop through data
            for (var i = 0; i < data.length; i++) {
                //create table row
                var tableRow = document.createElement("tr");
                //create table data
                var descriptionData = document.createElement("td");
            var amountData = document.createElement("td");
            var typeData = document.createElement("td");
            //set table data values
            descriptionData.innerHTML = data[i].description;
            amountData.innerHTML = data[i].amount;
            typeData.innerHTML = data[i].type;
            //append table data to table row
            tableRow.appendChild(descriptionData);
            tableRow.appendChild(amountData);
            tableRow.appendChild(typeData);
            //append table row to table body
            tableBody.appendChild(tableRow);
        }
        //calculate total income and expenses
        calculateTotalIncomeAndExpenses();
        //calculate balance
        calculateBalance();
    //display total income and expenses
    document.getElementById("total-income").innerHTML = totalIncome;
    document.getElementById("total-expense").innerHTML = totalExpense;
    //display balance
    document.getElementById("balance").innerHTML = balance;
}

//function to calculate total income and expenses
function calculateTotalIncomeAndExpenses() {
    //reset total income and expenses
    totalIncome = 0;
    totalExpense = 0;
    //loop through data
    for (var i = 0; i < data.length; i++) {
        //if type is income, add amount to total income
        if (data[i].type === "income") {
            totalIncome += Number(data[i].amount);
        }
        //if type is expense, add amount to total expense
        else if (data[i].type === "expense") {
            totalExpense += Number(data[i].amount);
        }
    }
}

//function to calculate balance
function calculateBalance() {
    //calculate balance
    balance = totalIncome - totalExpense;
}

    // Function to display chart
function displayChart() {
    // Get chart canvas
    var chartCanvas = document.getElementById("chart-canvas");
  
    // Check if chartCanvas has a chart instance
    if (chartCanvas.chart) {
      // Destroy the existing chart instance
      chartCanvas.chart.destroy();
    }
  
    // Create new chart instance
    var chart = new Chart(chartCanvas, {
      type: "pie",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Balance",
            data: [totalIncome, totalExpense],
            backgroundColor: ["#00FF00", "#FF0000"],
          },
        ],
      },
    });
  
    // Store the chart instance on the chartCanvas element
    chartCanvas.chart = chart;
  }
  
// }

//call init function when page loads
init();

//add event listener to add button
document.getElementById("add-button").addEventListener("click", addTransaction);

//add event listener to clear button
document.getElementById("clear-button").addEventListener("click", function() {
    //clear data
    data = [];
    //display data
    displayData();
    //display chart
    displayChart();
    //save data to local storage
    localStorage.setItem("data", JSON.stringify(data));
}
);

//add event listener to delete button
document.getElementById("delete-button").addEventListener("click", function() {
    //get input values
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var type = document.getElementById("type").value;
    //validate input values
    if (description === "" || amount === "" || type === "") {
        alert("Please enter a description, amount, and type.");
        return;
    }
    //loop through data
    for (var i = 0; i < data.length; i++) {
        //if description, amount, and type match, delete transaction
        if (data[i].description === description && data[i].amount === amount && data[i].type === type) {
            data.splice(i, 1);
            //display data
            displayData();
            //display chart
            displayChart();
            //save data to local storage
            localStorage.setItem("data", JSON.stringify(data));
            return;
        }
    }
    //if description, amount, and type do not match, display error message
    alert("Transaction not found.");
}
);

//add event listener to sort button
document.getElementById("sort-button").addEventListener("click", function() {
    //sort data by amount
    data.sort(function(a, b) {
        return b.amount - a.amount;
    });
    //display data
    displayData();
    //display chart
    displayChart();
    //save data to local storage
    localStorage.setItem("data", JSON.stringify(data));
}
);

//add event listener to filter button
document.getElementById("filter-button").addEventListener("click", function() {
    //get input value
    var type = document.getElementById("type").value;
    //validate input value
    if (type === "") {
        alert("Please enter a type.");
        return;
    }
    //filter data by type
    var filteredData = data.filter(function(transaction) {
        return transaction.type === type;
    });
    //display filtered data
    displayFilteredData(filteredData);
}
);

//function to display filtered data
function displayFilteredData(filteredData) {
    //get table body
    var tableBody = document.getElementById("table-body");
    //clear table body
    tableBody.innerHTML = "";
    //loop through filtered data
    for (var i = 0; i < filteredData.length; i++) {
        //create table row
        var tableRow = document.createElement("tr");
        //create table data
        var descriptionData = document.createElement("td");
        var amountData = document.createElement("td");
        var typeData = document.createElement("td");
        //set table data values
        descriptionData.innerHTML = filteredData[i].description;
        amountData.innerHTML = filteredData[i].amount;
        typeData.innerHTML = filteredData[i].type;
        //append table data to table row
        tableRow.appendChild(descriptionData);
        tableRow.appendChild(amountData);
        tableRow.appendChild(typeData);
        //append table row to table body
        tableBody.appendChild(tableRow);
    }
}

//add event listener to reset button
// document.getElementById("reset-button").addEventListener("click", function() {
//     //display data
//     displayData();
//     //display chart
//     displayChart();
// }
// );

//add event listener to save button
document.getElementById("save-button").addEventListener("click", function() {
    //save data to local storage
    localStorage.setItem("data", JSON.stringify(data));
}
);

//add event listener to load button
document.getElementById("load-button").addEventListener("click", function() {
    //load data from local storage
    data = JSON.parse(localStorage.getItem("data"));
    if(!data) alert("No data found.");
    //display data
    displayData();
    //display chart
    displayChart();
}
);

//add event listener to clear local storage button
document.getElementById("clear-local-storage-button").addEventListener("click", function() {
    //clear local storage
    localStorage.clear();
}
);

//add event listener to clear data button
document.getElementById("clear-data-button").addEventListener("click", function() {
    //clear data
    data = [];
    //display data
    displayData();
    //display chart
    displayChart();
}
);

//add event listener to clear chart button
document.getElementById("clear-chart-button").addEventListener("click", function() {
    //get chart canvas
    var chartCanvas = document.getElementById("chart-canvas");
    //clear chart canvas
    chartCanvas.getContext("2d").clearRect(0, 0, chartCanvas.width, chartCanvas.height);
}
);

//add event listener to clear all button
document.getElementById("clear-all-button").addEventListener("click", function() {
    //clear local storage
    localStorage.clear();
    //clear data
    data = [];
    //get chart canvas
    var chartCanvas = document.getElementById("chart-canvas");
    //clear chart canvas
    chartCanvas.getContext("2d").clearRect(0, 0, chartCanvas.width, chartCanvas.height);
}
);

//add event listener to calculate balance button
// document.getElementById("calculate-balance-button").addEventListener("click", function() {
//     //calculate balance
//     calculateBalance();
//     //display balance
//     displayBalance();
// }
// );

function displayBalance() {
    //get balance element
    var balanceElement = document.getElementById("balance");
    //display balance
    balanceElement.innerHTML = balance;
}

