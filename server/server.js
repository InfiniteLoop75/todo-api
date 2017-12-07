const {mongoose} = require('./db/mongoose');
const {Todo} = request('./models/todo');
const {User} = request('./models/user');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


