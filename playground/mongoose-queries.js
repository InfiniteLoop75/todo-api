const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id = '5a295b0b7306a8214cded0381';
// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log("Todos", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Found by id', todo)
// }).catch((e)=>console.log(e));
var id = '5a293a38fb88d90be458c584';
User.findById(id).then((user)=>{
    if(!user){
       return console.log('User with specified id not found');
    }
    console.log(user);
}).catch((e)=>console.log(e));