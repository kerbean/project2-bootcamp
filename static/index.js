let income = [];
let incomeTotal = 0;
let expense = [];
let expenseTotal = 0;
resultArray = [];

let totalPerCategory = {
  household: 0,
  bills: 0,
  transportation: 0,
  recreation: 0,
  miscellaneous: 0
};

let percentPerCategory = {
  household: 0,
  bills: 0,
  transportation: 0,
  recreation: 0,
  miscellaneous: 0
};

let budgetPerCategory = {
  household: {
    budget: 800,
    alreadyAppended: false
  },
  bills: {
    budget: 1000,
    alreadyAppended: false
  },
  transportation: {
    budget: 100,
    alreadyAppended: false
  },
  recreation: {
    budget: 200,
    alreadyAppended: false
  },
  miscellaneous: {
    budget: 500,
    alreadyAppended: false
  }
};

let type;

let expenseChart;

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

  switch (newLog.category) {
    case "household":
      totalPerCategory.household += newLog.amount;
      percentPerCategory.household =
        (totalPerCategory.household / budgetPerCategory.household.budget) * 100;
      console.log("Total: " + totalPerCategory.household);
      updateBudgetProgress();
      checkIfNearingBudget();
      updateExpenseChart();
      break;
    case "bills":
      totalPerCategory.bills += newLog.amount;
      percentPerCategory.bills =
        (totalPerCategory.bills / budgetPerCategory.bills.budget) * 100;
      console.log("Total: " + totalPerCategory.bills);
      updateBudgetProgress();
      checkIfNearingBudget();
      updateExpenseChart();
      break;
    case "transportation":
      totalPerCategory.transportation += newLog.amount;
      percentPerCategory.transportation =
        (totalPerCategory.transportation /
          budgetPerCategory.transportation.budget) *
        100;
      console.log("Total: " + totalPerCategory.transportation);
      updateBudgetProgress();
      checkIfNearingBudget();
      updateExpenseChart();
      break;
    case "recreation":
      totalPerCategory.recreation += newLog.amount;
      percentPerCategory.recreation =
        (totalPerCategory.recreation / budgetPerCategory.recreation.budget) *
        100;
      console.log("Total: " + totalPerCategory.recreation);
      updateBudgetProgress();
      checkIfNearingBudget();
      updateExpenseChart();
      break;
    case "miscellaneous":
      totalPerCategory.miscellaneous += newLog.amount;
      percentPerCategory.miscellaneous =
        (totalPerCategory.miscellaneous /
          budgetPerCategory.miscellaneous.budget) *
        100;
      console.log("Total: " + totalPerCategory.miscellaneous);
      updateBudgetProgress();
      checkIfNearingBudget();
      updateExpenseChart();
      break;
  }

  //separating income and expenses according to radio button selected
  if ($("#expense").is(".button-outline")) {
    income.push(newLog.amount);
    incomeTotal = income.reduce(function(a, b) {
      return a + b;
    }, 0);
  } else {
    expense.push(newLog.amount);
    expenseTotal = expense.reduce(function(a, b) {
      return a + b;
    }, 0);
    console.log(expenseTotal);
  }

  //print the values into a running total
  $("#incomeTotal").html(`+ $${incomeTotal}`);
  $("#expenseTotal").html(`- $${expenseTotal}`);

  //creating new rows according to newly added income / expenses
  resultArray.push(
    `
<tr>
    <td>` +
      newLog.date +
      `</td>
    <td>` +
      newLog.name +
      `</td>
  <td>` +
      newLog.type +
      `</td>
    <td>$` +
      newLog.amount +
      `</td>` +
      `<td>` +
      newLog.category +
      `</td>
    </tr>
`
  );
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
  console.log("Sending new item to database");
  $.post("/additem", log, function() {
    window.location.href = "/";
  });
}

function updateExpenseChart() {
  expenseChart.data.datasets.forEach(dataset => {
    dataset.data = [
      totalPerCategory.household,
      totalPerCategory.bills,
      totalPerCategory.transportation,
      totalPerCategory.recreation,
      totalPerCategory.miscellaneous
    ];
    dataset.label = "Amount (AUD)";
  });

  expenseChart.update();
}

function updateBudgetProgress() {
  $("#household-progress").attr("value", totalPerCategory.household);
  $("#household-numbers").html(
    "$" +
      totalPerCategory.household +
      " / $" +
      budgetPerCategory.household.budget
  );

  $("#bills-progress").attr("value", totalPerCategory.bills);
  $("#bills-numbers").html(
    "$" + totalPerCategory.bills + " / $" + budgetPerCategory.bills.budget
  );

  $("#transport-progress").attr("value", totalPerCategory.transportation);
  $("#transport-numbers").html(
    "$" +
      totalPerCategory.transportation +
      " / $" +
      budgetPerCategory.transportation.budget
  );

  $("#rec-progress").attr("value", totalPerCategory.recreation);
  $("#rec-numbers").html(
    "$" +
      totalPerCategory.recreation +
      " / $" +
      budgetPerCategory.recreation.budget
  );

  $("#misc-progress").attr("value", totalPerCategory.miscellaneous);
  $("#misc-numbers").html(
    "$" +
      totalPerCategory.miscellaneous +
      " / $" +
      budgetPerCategory.miscellaneous.budget
  );

  console.log(totalPerCategory);
}

function checkIfNearingBudget() {
  $(".high-budgets").empty();
  for (let category in percentPerCategory) {
    if (percentPerCategory[category] > 70) {
      $("#" + category + "-budget-div").hide();

      let tempBudgetBar = $(".high-budget-bar").clone();
      $(tempBudgetBar)
        .appendTo(".high-budgets")
        .attr("id", category + "-high");
      $(tempBudgetBar).css("display", "block");
      $(tempBudgetBar)
        .find("h5")
        .html(category);

      let tempBudgetValues = $(tempBudgetBar)
        .find("progress")
        .attr("id", category + "-high-progress");
      $(tempBudgetValues).attr("max", budgetPerCategory[category].budget);
      $(tempBudgetValues).attr("value", totalPerCategory[category]);

      let tempBudgetText = $("#" + category + "-high")
        .find("small")
        .attr("id", category + "-high-small");
      $(tempBudgetText).html(
        "$" +
          totalPerCategory[category] +
          " / $" +
          budgetPerCategory[category].budget
      );
    }
  }
}
