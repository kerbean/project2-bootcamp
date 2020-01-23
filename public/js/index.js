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

//adding items to results table
$('#add-budget-button').on("click", function () {

    let name = $("#name").val();
    let amount = $('#starting_amount').val();
    let category = $('#sid_dropdown').val();
    var income = [];
    var incomeTotal = 0;
    let expense;


    if ($('#income').is(':checked')) {
        console.log(typeof (amount.val()))
        income.push(parseFloat(amount));
        incomeTotal = income.reduce(function (a, b) {
            return a + b;
        }, 0);
        console.log(income)
        console.log(incomeTotal);
    }


    $('#incomeTotal').text(`income: $10`);
    $('#expenseTotal').text(`expense: $-20`);



    $('#results-rows').append(`
                            <tr>
                                <th>` + name + `</th>
                                <th>` + amount + `</th>
                                <th>` + category + `</th>
                                </tr>
                        `);

    var rowTotal = [];
    var printTotal = 0;


    function sumArray(z) {
        z.reduce(function (a, b) {
            return a + b;
        }, 0)

    }

    $('#results-rows tr').each(function () {
        $(this).find('th').each(function () {
            var th = $(this);
            if ($.isNumeric(th.text())) {
                rowTotal.push(parseFloat(th.text()));
                printTotal = rowTotal.reduce(function (a, b) {
                    return a + b;
                }, 0);
                console.log(printTotal);
            }
        });
        $('#total-rows').text('Total: $' + printTotal);
    });

});