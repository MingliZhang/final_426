const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const User = require('./User.js');


const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'main_interface')))

const io = socketio(server);


io.on('connection', socket=>{
    console.log(socket.id);

    socket.emit('message', 'welcome');
    socket.broadcast.emit('message', 'A user has joined the chat')
    
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('message', 'the user has left the chat')
    })

    socket.on('chatMessage', msg=>{
        io.emit('chatMessage', msg)
    });
})



const port = 3030;
server.listen(port, ()=>{
    console.log("Working on port " + port);
});