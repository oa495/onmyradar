var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
/* GET users listing. */

router.get('/todos', function(req, res) {
	console.log('getting....')
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {
    	console.log("todos", todos);
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send("err")

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
router.post('/todos', function(req, res) {
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
router.delete('/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

router.get('/', function(req, res) {
	res.sendFile('./client/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
module.exports = router;
