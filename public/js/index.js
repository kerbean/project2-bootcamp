$(document).ready(function () {
    $('#add-budget-button').hide();
    $('input').change(function () {
        if ($('#name').val() && $('#starting_amount').val() && $('#sid_dropdown').val()) {
            $('#add-budget-button').show();
        }
    });
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
    let name = $("#name").val();
    let amount = parseFloat($('#starting_amount').val());
    let category = $('#sid_dropdown').val();


    //seperating income and expenses according to radio button selected
    if ($('#income').is(':checked')) {
        income.push(amount);
        incomeTotal = income.reduce(function (a, b) {
            return a + b;
        }, 0);
    } else {
        expense.push(amount);
        expenseTotal = expense.reduce(function (a, b) {
            return a + b;
        }, 0);
        console.log(expenseTotal)
    }


    //print the values into a running total
    $('#incomeTotal').text(`income: $` + incomeTotal);
    $('#expenseTotal').text(`expenses: $` + expenseTotal);



    //creating new rows according to newly added income / expenses


    resultArray.push(`
<tr>
    <th>` + name + `</th>
    <th>` + amount + `</th>
    <th>` + category + `</th>
    </tr>
`);
    //console.log(resultArray);
    if ($('#results-rows').length < 11) {
        $('#results-rows').append(resultArray.slice(-1));
    } else {
        $('#results-rows').append(resultArray.slice(-1));
        $('#results-rows').closest('<tr>');
    }

    console.log($('#results-rows'));

    console.log(resultArray.length)

    console.log($('#results-rows').length)


    //creating a running total

    printTotal = incomeTotal - expenseTotal;


    // var rowTotal = [];
    // var printTotal = 0;
    // $('#results-rows tr').each(function () {
    //     $(this).find('th').each(function () {
    //         var th = $(this);
    //         if ($.isNumeric(th.text())) {
    //             rowTotal.push(parseFloat(th.text()));
    //             printTotal = rowTotal.reduce(function (a, b) {
    //                 return a + b;
    //             }, 0);
    //             console.log(printTotal);
    //         }
    //     });
    $('#runningTotal').text('Total: $' + printTotal);
    //});


});