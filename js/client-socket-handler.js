count = 0;
var socket = io.connect(window.location.host.split(":")[0] + ':3000');  // take the IP address of the machine, assuming socket server is on the same machine.
socket.on('sensors', function (data) { //append sensors to table
      
    data.forEach(function (d) {
       	var html = '<tr class=sensore ><td>' + d + '</td><td id="' + d + '"></td></tr>';
        $('#temps').append(html);
    });
});
      
//update corresponding row with sensor value
socket.on('temps', function (data) {
    count = count + 1;

    $('#' + data.id).html(data.value);
    if ((count % 4) == 0) { updateChart(data.value); }
});

socket.on('disconnect', function () {
    $(".sensore").remove();
    alert('Socket is disconnected.');

});