$(document).ready(function () {
    $('#add-budget-button').hide();
    $('input').change(function () {
        if ($('#name').val() && $('#starting_amount').val() && $('#sid_dropdown').val() && (($('#income').is(':checked') || $('#expense').is(':checked')))) {
            $('#add-budget-button').show();
        }
    });


    $('#loginButton').on('click', function () {
        // successful login
        $('#loginModal').hide();
        $('#content').show();
    })

    let income = [];
    let incomeTotal = 0;
    let expense = [];
    let expenseTotal = 0;
    resultArray = []



    //adding items to results table
    $('#add-budget-button').on("click", function () {

        //storing values from forms into variables
        let logType;
        let name = $("#name").val();
        let amount = parseFloat($('#starting_amount').val());
        let category = $('#sid_dropdown').val();


        //seperating income and expenses according to radio button selected
        if ($('#income').is(':checked')) {
            logType = "Income";
            income.push(amount);
            incomeTotal = income.reduce(function (a, b) {
                return a + b;
            }, 0);
        } else {
            logType = "Expense"
            expense.push(amount);
            expenseTotal = expense.reduce(function (a, b) {
                return a + b;
            }, 0);
        }

        console.log(logType)

        //print the values into a running total
        $('#incomeTotal').text(`income: $` + incomeTotal);
        $('#expenseTotal').text(`expenses: $` + expenseTotal);


        //creating new rows according to newly added income / expenses
        resultArray.push(`
    <tr>
    <th>` + logType + `</th>
    <th>` + name + `</th>
    <th>` + amount + `</th>
    <th>` + category + `</th>
    </tr>
                        `);

        //only showing the last 10 results
        if (resultArray.length < 11) {
            $('#results-rows').prepend(resultArray.slice(-1));
        } else {
            $('#results-rows').prepend(resultArray.slice(-1));
            $('#results-rows tr:last').remove();
            //create a 'full transaction list' button
            $('#full-list').html('<h1>Log Of Last 10 Transactions:</h1>;<button type="button" class="btn" id="full-list-button">Click Here to See a full list.</button>')
            //click event to show/hide modal
            $('#full-list-button').on("click", function () {
                $('#add-budget-button').hide();
                $('#full-list-modal').show()
                $('#full-results-rows').html(resultArray);
            });
            $('#full-list-close').on("click", function () {
                $('#full-list-modal').hide();
                $('#add-budget-button').show();
            })
        }

        //creating a running total
        printTotal = incomeTotal - expenseTotal;
        $('#runningTotal').text('Total: $' + printTotal);

    });


});