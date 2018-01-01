const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
        _id: userOneId,
        email: 'ibroke@example.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, 'ibrokhimjon').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'ibrokhim@example2.com',
        password: 'userTwoPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, 'ibrokhimjon').toString()
        }]
    }
];


var todos = [
    {
        _id: new ObjectID(),
        text: 'Something todo',
        completed: false,
        completedAt: 1558
    },
    {
        _id: new ObjectID(),
        text: 'Buy food',
        completed: false,
        completedAt: 334
    },
    {
        _id: new ObjectID(),
        text: 'Go home',
        completed: false,
        completedAt: 58548
    },
    {
        _id: new ObjectID(),
        text: 'Complete proj',
        completed: false,
        completedAt: 852
    },
    {
        _id: new ObjectID(),
        text: 'Prepare for exam',
        completed: false,
        completedAt: 9633
    },
    {
        _id: new ObjectID(),
        text: 'Another todo',
        completed: false,
        completedAt: 7412
    },
    {
        _id: new ObjectID(),
        text: 'Do CW',
        completed: false,
        completedAt: 1548
    },
    {
        _id: new ObjectID(),
        text: 'Blah blah blah',
        completed: false,
        completedAt: 6925
    }
];
const populateTodos = (done)=>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=>done());
};



const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(user[1]).save();
        return Promise.all([userOne, userTwo])
        
    }).then(()=>done());
};

module.exports = {todos, populateTodos, users, populateUsers};