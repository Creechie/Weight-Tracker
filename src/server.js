var express = require('express');

var server = express();

server.get('/', function(req,res){
    res.send('Hello');
});
server.get('/contact', function(req,res){
    res.send('Hello again');
});

server.listen(8080);