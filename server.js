var fs = require('fs');
var data = fs.readFileSync('assets/data/users.json');
var userObject = JSON.parse(data);

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
server.get('/:user/diary', getDiary);
server.get('/:user/add/:date?/:weight?/:calories?', addEntry);


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

    if (userObject[name]) {
        console.log('Found!');
        reply = {
            status: "Found",
            user: name,
            sex: userObject[name].sex,
            age: userObject[name].age,
            height: userObject[name].height,
            goal: userObject[name].goal,
            diary: userObject[name].diary
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

function getDiary(req, res) {
    var user = req.params.user;

    console.log('Getting ' + user + '\'s diary...');

    if (userObject[user]) {
        console.log('Found!');
        res.send(userObject[user].diary);

    } else {
        console.log('User does not exist');
        res.send('User "' + user + '" does not exist')
    }
}

function writeToFile() {
    var data = JSON.stringify(userObject, null, 2);
    fs.writeFile('assets/data/users.json', data, function (err) {
        console.log('Diary saved!')
    });
}

function addEntry(req, res) {
    var user = req.params.user;
    var date = req.params.date;
    var weight = Number(req.params.weight);
    var calories = Number(req.params.calories);
    var diary = userObject[user].diary;
    var reply = {
        user: user,
        date: date,
        weight: weight,
        calories: calories,
        status: "Success",
    };

    if (date && weight && calories) {
        // loop through diary to find matching date
        var found = false;
        for (let i = 0; i < diary.length; i++) {
            const entry = diary[i];
            // if existing entry is found, overwrite that entry
            if (entry.date == date) {
                found = true;
                overwrite(user, weight, calories, i);
                writeToFile();
                res.send(reply);
                break;
            }
        }
        if (!found) {
            var newEntry = {
                "date": date,
                "weight": weight,
                "calories": calories
            };
            userObject[user].diary.push(newEntry);
            writeToFile();
            res.send(reply);
        }

    } else { // !(date && weight && calories)
        reply = {
            user: user,
            date: date,
            weight: weight,
            calories: calories,
            status: "Failure",
            msg: "Add request not in format /USERNAME/add/DATE/WEIGHT/CALORIES"
        };
        res.send(reply);
    }
}

function overwrite(user, weight, kcal, index) {
    console.log('Overwritting entry %d...', index);
    userObject[user].diary[index].weight = weight;
    userObject[user].diary[index].calories = kcal;
}