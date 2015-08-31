var count = 0;
var socket = io.connect(window.location.host.split(":")[0] + ':3000');  // take the IP address of the machine, assuming socket server is on the same machine.

_begin = "<"
_end = ">"
_slash = "/"

function NEWTag(tag, HTMLclass, id, content) {
    this.tag = tag;
    this.HTMLclass = HTMLclass;
    this.id = id;
    this.content = content;
    this.getFullTag = function () {
        if (this.tag) {
            var finalString = _begin + this.tag
            if (this.HTMLclass) { finalString = finalString + " class=" + '"' + this.HTMLclass + '" '; }
            if (this.id) { finalString = finalString + " id=" + '"' + this.id + '" '; }
            finalString = finalString + _end;
            if (content) { finalString = finalString + this.content; }
            finalString = finalString + _begin + _slash + this.tag + _end;
            return finalString;
        }
        else {
            return null;
        }
    }
}



/*
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
*/

var arr = (function (a, b) { while (a--) b[a] = a; return b })(25, []);
var startingData = { labels: arr, datasets: [{fillColor: "rgba(151,187,205,0.2)",strokeColor: "rgba(151,187,205,1)",pointColor: "rgba(151,187,205,1)",pointStrokeColor: "#fff", data: arr}]};
var latestLabel = startingData.labels[6];

function updateChart(value) {
    // Add two random numbers for each dataset
    myLiveChart.addData([value], ++latestLabel);
    // Remove the first point so we dont just add values forever
    myLiveChart.removeData();
};

var MyLiveCharts, contexts, canvases;

socket.on('sensors', function (data) { //append sensors to table
    data.forEach(function (d) {
        var td = new NEWTag("td", null, null, d).getFullTag() + new NEWTag("td", null, d, null).getFullTag();
        var tr = new NEWTag("tr", "sensore", null, td).getFullTag();
        var html = tr;
       	//var html = '<tr class=sensore ><td>' + d + '</td><td id="' + d + '"></td></tr>';
        $('#temps').append(html);
        var html = '<canvas class=csensor style="width: 500px; height: 300px;" id="c' + d + '" width="500" height="300"></canvas>';
        $('#charts-container').append(html);
    });

    canvases = $(".csensor");
    MyLiveCharts = new Array(canvases.length);
    contexts = new Array(canvases.length);
    
    for (var i = 0; i < canvases.length; i++) {
        contexts[i] = canvases[i].getContext('2d');
        MyLiveCharts[i] = new Chart(contexts[i]).Line(startingData, {
            animationSteps: 10,
            scaleOverride: true,
            scaleSteps: 10,
            scaleStepWidth: 12,
            scaleStartValue: 0
        });
    }
    //console.log(contexts[0]);
    //console.log(MyLiveCharts[0]);
    //console.log(canvases[0]);
    //console.log(canvases.length);

});
 
//update corresponding row with sensor value
/*socket.on('temps', function (data) {
    count = count + 1;
    //console.log(data);

    $('#' + data.id).html(data.value);
    if ((count % 4) == 0) { updateChart(data.value); }
});
*/
socket.on('disconnect', function () {
    $(".sensore").remove();
    $(".csensor").remove();
    alert('Socket is disconnected.');

});

socket.on('sensorValues', function (values) {
    //console.log(values);
    values.data.forEach(function (object) {
    // console.log(object.id,object.value);
    $('#' + object.id).html(object.value);
    });
});