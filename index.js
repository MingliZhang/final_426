const express = require('express');

const app = express();

const User = require('./User.js');

app.get('/user',(req,res) =>{
    res.json(User.getAllIDs());
    return;
});

const port = 3030;
app.listen(port, ()=>{
    console.log("Working on port " + port);
});