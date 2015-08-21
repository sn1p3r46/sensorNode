var count = 0;
var socket = io.connect(window.location.host.split(":")[0] + ':3000');  // take the IP address of the machine, assuming socket server is on the same machine.


socket.on('sensors', function (data) { //append sensors to table
      
    data.forEach(function (d) {
       	var html = '<tr class=sensore ><td>' + d + '</td><td id="' + d + '"></td></tr>';
        $('#temps').append(html);
        var html = '<canvas class=csensor style="width: 500px; height: 300px;" id="c' + d + '" width="500" height="300"></canvas>';
        $('#charts-container').append(html);
    });
    var canvases = $(".csensor");
    console.log(canvases);
    console.log(canvases.length );
    
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