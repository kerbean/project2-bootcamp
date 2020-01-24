var expenseChart = document.getElementById("pie-chart");

new Chart(expenseChart, {
  type: "doughnut",
  data: {
    labels: ["Household", "Bills", "Pets", "Travel", "Sport & Leisure"],
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
        data: [478, 1267, 234, 284, 433]
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
