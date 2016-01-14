var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

/* schemassss
	each user has a list of todos (which is made up of Todo)
*/
var User = new mongoose.Schema({
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

var Todo = new mongoose.Schema({
  title: {type:String, required:true},
  priority: {type:Number, required: true},
  dayOfWeek: {type:String, required:true},
  description: String,
  done: Boolean,
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});


User.plugin(passportLocalMongoose);
mongoose.model('User', User);
mongoose.model('Todo', Todo);
mongoose.connect('mongodb://yeli:aren@ds045795.mongolab.com:45795/tasks' || 'mongodb://127.0.0.1/todos');
