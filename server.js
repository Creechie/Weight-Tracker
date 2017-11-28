var express = require('express');

var server = express();

server.use('/assets', express.static('assets'));

server.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});


server.listen(8080);