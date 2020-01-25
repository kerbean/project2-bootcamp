// $(document).ready(function () {
//     $('#add-budget-button').hide();
//     $('input').change(function () {
//         if ($('#name').val() && $('#starting_amount').val() && $('#sid_dropdown').val()) {
//             $('#add-budget-button').show();
//         }
//     });
// });

let moment = require("moment");

let income = [];
let incomeTotal = 0;
let expense = [];
let expenseTotal = 0;
resultArray = [];

let type;

$(".income-expense-btns").on("click", function(event) {
  event.preventDefault();
  if (event.currentTarget.id == "expense") {
    $("#expense").removeClass("button-outline");
    $("#income").addClass("button-outline");
    type = "Expense";
  } else if (event.currentTarget.id == "income") {
    $("#income").removeClass("button-outline");
    $("#income").attr("id", "selected-type");
    $("#expense").addClass("button-outline");
    type = "Income";
  }
});

$("#loginButton").on("click", function() {
  // successful login
  $("#loginModal").hide();
  $("#content").show();
});

//adding items to results table
$("#add-budget-button").on("click", function(event) {
  event.preventDefault();

  let newLog = {
    date: moment().format("DD/MM/YYYY"),
    name: $("#name")
      .val()
      .trim(),
    type: type,
    amount: parseFloat($("#starting_amount").val()),
    category: $("#sid_dropdown").val()
  };

  logExpense(newLog);

  //storing values from forms into variables
  // let name = $("#name").val();
  // let amount = parseFloat($("#starting_amount").val());
  // let category = $("#sid_dropdown").val();

  //seperating income and expenses according to radio button selected
  if ($("#expense").is(".button-outline")) {
    income.push(amount);
    incomeTotal = income.reduce(function(a, b) {
      return a + b;
    }, 0);
  } else {
    expense.push(amount);
    expenseTotal = expense.reduce(function(a, b) {
      return a + b;
    }, 0);
    console.log(expenseTotal);
  }

  //print the values into a running total
  $("#incomeTotal").html(`+ $${incomeTotal}`);
  $("#expenseTotal").html(`- $${expenseTotal}`);

  //creating new rows according to newly added income / expenses
  resultArray.push(newLog);
//     `
// <tr>
//     <td>` +
//       name +
//       `</td>
//     <td>` +
//       type +
//       `</td>
//   <td>` +
//       amount +
//       `</td>
//     <td>` +
//       category +
//       `</td>
//     </tr>
// `
  //console.log(resultArray);
  if ($("#results-rows").length < 11) {
    $("#results-rows").append(resultArray.slice(-1));
  } else {
    $("#results-rows").append(resultArray.slice(-1));
    $("#results-rows").closest("<tr>");
  }

  console.log($("#results-rows"));

  console.log(resultArray.length);

  console.log($("#results-rows").length);

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
  $("#runningTotal").text(`$${printTotal}`);
  //});
});

function logExpense(log) {
  $.post("/additem", log, function() {
    window.location.href = "/";
  });
}