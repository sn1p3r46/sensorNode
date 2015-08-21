
var arr = (function (a, b) { while (a--) b[a] = a; return b })(25, []);
var canvas = document.getElementById('updating-chart'),
      ctx = canvas.getContext('2d'),
      startingData = {
            labels: arr,
            datasets: [
                  {
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        data: arr
                  }
            ]
      },
      latestLabel = startingData.labels[6];
      
// Reduce the animation steps for demo clarity.
      
var myLiveChart = new Chart(ctx).Line(startingData, {
      animationSteps: 10,
      scaleOverride: true,
      scaleSteps: 10,
      scaleStepWidth: 12,
      scaleStartValue: 0
});


function updateChart(value) {
      // Add two random numbers for each dataset
      myLiveChart.addData([value], ++latestLabel);
      // Remove the first point so we dont just add values forever
      myLiveChart.removeData();
};

