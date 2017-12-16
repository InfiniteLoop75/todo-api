const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

Todo.findByIdAndRemove('5a34fa972f8a141f9aa8842d').then((todo)=>{
    console.log(todo);
});