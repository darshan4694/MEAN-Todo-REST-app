const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((docs)=>{
        res.send(docs);
    }, (e)=>{
        res.status(400).send();
    });
});

app.get('/todos', (req, res)=>{

    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send();
    });
});

app.listen(3000, () =>{
    console.log("App runningon 'localhost:3000'");
});

module.exports = {app};