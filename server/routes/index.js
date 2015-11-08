var express = require('express');
var router = express.Router();

/* GET home page. */
console.log('here');

router.get('/hey', function(req, res) {
    res.sendFile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
