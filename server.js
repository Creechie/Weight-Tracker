var fs = require('fs');
var data = fs.readFileSync('assets/data/user-diary.json');
var userObject = JSON.parse(data)

console.log('Server is starting...');

var express = require('express');
var server = express();
server.listen(8080, listening);

console.log('Done!');

function listening() {
    console.log('Listening...');
}

server.use('/assets', express.static('assets'));

// Routes
server.get('/', sendIndex);
server.get('/all', sendAll);
server.get('/search/:user/', searchUser);

function sendIndex(req, res) {
    res.sendFile(__dirname + '/index.html');
}

function sendAll(req, res) {
    console.log('Sending all...');
    res.send(userObject);
}

function searchUser(req, res) {
    var name = req.params.user;
    var reply = {};

    console.log('Looking for user \'' + name + '\'...');
    
    if (userObject.name == name) {
        console.log('Found!');
        reply = {
            status: "Found",
            user: name,
            age: userObject.age,
            height: userObject.height
        }
    } else {
        console.log('User was not found');
        reply = {
            status: "Not found",
            user: name
        }
    }
    res.send(reply);
}