//Include necessary node packages

var staticServer = require('./staticServer.js');
staticServer.startme(connect,serveStatic);
var io = require('socket.io').listen(3000);

broadcaster = false;
var me = false;
var interval = 3000 //enter the time between sensor queries here (in milliseconds)

//when a client connects
io.sockets.on('connection', sendSensorData);

function sendSensorData (socket,me) {
   var me = false;
   var sensorIDs = [ 'sensor1', 'sensor2', 'sensor3', 'sensor4' ];
   //fetch array containing each ds18b20 sensor's ID
   socket.emit('sensors', sensorIDs); //send sensor ID's to clients

   //initiate interval timer
   intID = setInterval(function(){sensorwork(socket,intID,sensorIDs);}, interval,me);
}


   function sensorwork (socket , intID,sensorIDs) {
   console.log(intID);
    if(!broadcaster){
        broadcaster = true;
        me=true;
    }
       //loop through each sensor id
       console.log(socket.connected, broadcaster, me);
   if(broadcaster && me){

       sensorIDs.forEach(function (id) {
               //send temperature reading out to connected clients
       value = Math.random() * (100 - 10) + 10;
               //socket.emit('temps', {'id': id, 'value': value});
        io.sockets.emit('temps', {'id': id, 'value': value});
           //console.log("brodcastato");
   });
 }
 else if (!socket.connected && me){
 broadcaster = false;
 me=false;
 socket.conn.close();
 console.log("chiudo");
 setTimeout(intID);
 test(intID);
 }
}

function test(intID){clearInterval(intID);};
