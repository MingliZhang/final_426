// const express = require('express');
// const http = require('http');
// const socketio = require('socket.io');
// const path = require('path');
// const bodyParser = require('body-parser');


// const app = express();


// app.use(bodyParser.json())
// app.use(express.static(__dirname))
// const server = http.createServer(app);
// const io = socketio(server);


// io.on('connection', socket=>{
//     socket.emit('message', 'welcome');
//     socket.broadcast.emit('message', 'A user has joined the chat')
    
//     socket.on('disconnect', ()=>{
//         socket.broadcast.emit('message', 'the user has left the chat')
//     })

//     socket.on('chatMessage', msg=>{
//         socket.broadcast.emit('chatMessage', msg)
//     });
// })



// const PORT = process.env.PORT || 3000;
// server.listen(PORT, ()=>{
//     console.log("Working on port " + PORT);
// });