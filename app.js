


var staticServer = require('./staticServer.js');
staticServer.startme(connect,serveStatic);
var io = require('socket.io').listen(3000);


var interval = 1000

var sensorIDs = [ 'sensor1', 'sensor2', 'sensor3', 'sensor4' ];
numero = 0
running = false;
io.sockets.on('connection',function(socket) {
   socket.emit('sensors', sensorIDs);
   if (io.sockets.server.engine.clientsCount==1 && !running) {intID = setInterval(sensorwork,interval); running=true;}
   console.log
});




function sensorwork(){
    console.log(io.sockets.server.engine.clientsCount);
    sensorIDs.forEach(function (id) {
    //send temperature reading out to connected clients
    value = Math.random() * (100 - 70) + 70;
    //socket.emit('temps', {'id': id, 'value': value});
    io.sockets.emit('temps', {'id': id, 'value': value});
    //console.log(intID);
    });
    if (io.sockets.server.engine.clientsCount==0 && running) {clearInterval(intID); running=false; }
}
