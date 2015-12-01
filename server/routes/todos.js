console.log('here now');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');


console.log('HEERREEE NOWW');
/* GET users listing. */
router.get('/todos', function(req, res) {
    console.log('user: ', req.user);
    if (req.user) {
        console.log('getting....1');
        // use mongoose to get all todos in the database
        User.findOne({username: req.user.username})
        .populate('todos').exec(function(err, user) {
            console.log("todos", user.todos);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.sendStatus(401);

            res.json(user.todos); // return all todos in JSON format
        });
    }
    else {
        res.sendStatus(401);
    }
});

// create todo and send back all todos after creation
router.post('/todos', function(req, res) {
    console.log('user: ', req.user);
    console.log('creating 2');
    console.log(req.body.user)
    console.log(req.body.username)
    console.log(req.body.title)
    // create a todo, information comes from AJAX request from Angular
    var todo = new Todo({
        title: req.body.title,
        priority: req.body.priority,
        dayOfWeek: req.body.dayOfWeek,
        description: req.body.description,
        done: false,
        user: req.user._id
    });

    todo.save(function(err, savedTodo, count) {
        req.user.todos.push(savedTodo._id);
        req.user.save(function(err, savedUser, count) {
            console.log('in save');
            if (err)
            res.send(err);

            else 
                User.findOne({username: req.body.username }, function(err, todos) {
                    if (err)
                        res.send(err)
                    res.json(todos);
                 });
        })
    });
});

// delete a todo
router.delete('/todos/:todo_id', function(req, res) {
    console.log('user: ', req.user);
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find({ user: req.user._id }, function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

router.get('*', function(req, res) {
    console.log('user: ', req.user);
    console.log('everything 2');
    res.sendFile('./client/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
module.exports = router;
