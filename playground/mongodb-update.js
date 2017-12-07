//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5a291ee25e27dc7af8c988fc')
//    }, {
//        $set:{
//            completed: true
//        }
//    }, {
//        returnOriginal: false
//    }).then((res)=>{
//        console.log(res.value);
//    });
//============================================================================
//Self Practice
//============================================================================
        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID('5a26bc560bf3f60754b8a02b')
        },{
            $set:{
                name: 'New Admin'
            },
            $inc:{
                age: 1
            }
            
        },{
            returnOriginal:false
        }).then((res)=>{
            console.log(res.value);
        });
    
    //db.close();
});