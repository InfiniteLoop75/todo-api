//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Buy potatoes',
    //     commpleted: true
    // }, (err, res)=>{
    //     if(err){
    //         return console.log('Unable to insert data', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });
    // db.collection('Users').insertOne({
    //     name: 'Admin',
    //     age: 25,
    //     location: 'Uzbekistan'
    // }, (err, res)=>{
    //     if(err){
    //         return console.log('Unable to insert new record', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    //     console.log(res.ops[0]._id.getTimestamp());
    // });
    db.close();
});