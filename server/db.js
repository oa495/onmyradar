var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

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
mongoose.connect('mongodb://127.0.0.1/todos');
