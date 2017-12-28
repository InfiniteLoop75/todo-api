const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {authenticate} = require('./middleware/authenticate');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const server = express();

server.use(bodyParser.json());
server.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
});
server.get('/todos',  (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    });
});
server.get('/todos/:id', (req, res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send('not found');
    }
    Todo.findById(req.params.id).then((todo)=>{
        
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});
server.delete('/todos/:id',(req, res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(req.params.id).then((doc)=>{
        if(!doc){
            return res.status(404).send();
        }
        res.status(200).send({doc});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});
server.listen(3000, ()=>{
    console.log('Started on PORT 3000');
});
server.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, 
        {
            $set: body
        },
        {new: true}
    
    ).then((todo)=>{
        if(!todo){
            return res.status(202).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

//POST /users
server.post('/users', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User({
        email: body.email,
        password: body.password
    });

    


    user.save().then(()=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user);
        });
    }, (e)=>{
        res.status(400).send(e);
    });
    
});
 
server.get('/users/me', authenticate, (req, res)=>{
    res.send(req.user);
});
module.exports = {server};