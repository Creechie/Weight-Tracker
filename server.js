var express = require('express');

var server = express();

server.use('/assets', express.static('assets'));

server.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
server.get('/contact', function(req,res) {
    res.send('Hello again');
});

server.get('/profile/:id', function(req,res) {
    res.send('You requested a profile with the id of ' + req.params.id); 
});

server.listen(8080);