const expenseChartElement = document.getElementById("pie-chart");

expenseChart = new Chart(expenseChartElement, {
  type: "doughnut",
  data: {
    labels: [
      "Household",
      "Bills",
      "Transportation",
      "Recreation",
      "Miscellaneous"
    ],
    datasets: [
      {
        label: "Amount (AUD)",
        backgroundColor: [
          "#9B4DCA",
          "#7E4AE0",
          "#5147D6",
          "#D04AE0",
          "#D647AC"
        ],
        data: [
          totalPerCategory.household,
          totalPerCategory.bills,
          totalPerCategory.transportation,
          totalPerCategory.recreation,
          totalPerCategory.miscellaneous
        ]
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    animation: {
      duration: 2000
    },
    title: {
      display: false,
      text: "Your month in review"
    }
  }
});
