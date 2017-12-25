
const {MongoClient, ObjectID} = require('mongodb');


var todos = [
    {
        text: 'Something todo',
        completed: false,
        completedAt: 1558
    },
    {
        text: 'Buy food',
        completed: false,
        completedAt: 334
    },
    {
        text: 'Go home',
        completed: false,
        completedAt: 58548
    },
    {
        text: 'Complete proj',
        completed: false,
        completedAt: 852
    },
    {
        text: 'Prepare for exam',
        completed: false,
        completedAt: 9633
    },
    {
        text: 'Another todo',
        completed: false,
        completedAt: 7412
    },
    {
        text: 'Do CW',
        completed: false,
        completedAt: 1548
    },
    {
        text: 'Blah blah blah',
        completed: false,
        completedAt: 6925
    }
]

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    try{
        db.collection('todos').remove();
        db.collection('todos').insertMany(todos);
    }catch(e){
        console.log(e);
    }
    db.close();
});


