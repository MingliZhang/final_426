const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/api/users')

const db = require('./config/keys').mongoURI
mongoose.connect(db,  { useUnifiedTopology: true ,useNewUrlParser: true,})
    .then(()=>{console.log('connected...')})
    .catch((err=>console.log(err)))

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '')))
app.use('/api/users', users)
const io = socketio(server);


io.on('connection', socket=>{

    socket.emit('message', 'welcome');
    socket.broadcast.emit('message', 'A user has joined the chat')
    
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('message', 'the user has left the chat')
    })

    socket.on('chatMessage', msg=>{
        io.emit('chatMessage', msg)
    });
})



const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log("Working on port " + PORT);
});