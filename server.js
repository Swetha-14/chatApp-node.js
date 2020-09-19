var express= require('express');

const { listen } = require('socket.io');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');

var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);

users=[];
connections=[];
server.listen(3000);

app.get('/',function(req,resp){ //route for localhost:3000/
    resp.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection',function(socket){ //when client connects to server
    
    connections.push(socket); //add plug details to custom array
    console.log(' %s socket connected',connections.length); //current connections

    socket.on('disconnect',function(data){ //when client disconnects from server
        /*users.splice(users.indexOf(socket.username),1);
        updateUserNames(); */
        connections.splice(connections.indexOf(socket),1);  //delete plug details
        console.log(' %s socket disconnected',connections.length);  //current connections
    });
    
    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg: data,user:socket.username});
    });
    
    /*
    socket.on('new user',function(data,callback){
        console.log(data);
        callback(true);
        socket.username=data;
        users.push(socket.username);
        updateUserNames();
    });
    
    function updateUserNames(){
        io.sockets.emit('get users',users);
    }*/
});

console.log('Server is listening!');
