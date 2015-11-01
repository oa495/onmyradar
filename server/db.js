var mongoose = require('mongoose');

// my schema goes here!
var Todo = new mongoose.Schema({
  text: String,
  done: Boolean
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodb://localhost/todos');