var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/bower_components'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/remote.html');
});

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

io.set('origins', '*:*');
io.on('connection', function(client) {  
    console.log('Client connected...');
        
   client.on('draw',function(recvData) {
        console.log(recvData);
        client.broadcast.emit('draw1',recvData);
    });  
    
    
    client.on('join', function(data) {
        //console.log(data);
        client.emit('messages', 'Hello from server');
    });

});


server.listen(8080);  