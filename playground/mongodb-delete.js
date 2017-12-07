//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
   //Delete many
    // db.collection('Todos').deleteMany({text: 'Eat launch'}).then((res)=>{
    //     console.log(res);
    // });
   //Delete one
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res)=>{
    //     console.log(res);
    // });
   //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
    //     console.log(res);
    // });

    //================================================================
    //Self-Testing
    // //================================================================
    // db.collection('Users').deleteMany({name: 'Admin'}).then((res)=>{
    //     console.log(JSON.stringify(res.result, undefined, 2));
    // });

    db.collection('Users').findOneAndDelete({name: 'Mike'}).then((res)=>{
        console.log(JSON.stringify(res.value.name + ' has been deleted',undefined,2));
    });
    db.collection('Users').deleteOne({_id: new ObjectID('5a29230c5e27dc7af8c98a46')}).then((res)=>{
        console.log(res);
    });
    
    //db.close();
});