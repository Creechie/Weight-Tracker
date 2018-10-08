$(function () {
    setUser('Charlie Creech'); // To be replaced with a login page
    calculateProgress('Charlie Creech');
    setCurrentWeight('Charlie Creech');

    $('#new-entry').click(function (err) {
        err.preventDefault();
        $(".modal").fadeIn("fast");
    });
    $('.modal-submit').click(function (err) {
        err.preventDefault();
        if (submit())
            $(".modal").fadeOut("fast");
    });
    $('.modal-cancel').click(function (err) {
        err.preventDefault();
        $(".modal").fadeOut("fast");
    });
});

// Starting weight - current weight
function calculateProgress(user) {
    var startWeight;
    var currentWeight;

    // Get user's diary
    var url = '/' + user + '/diary';
    $.getJSON(url, function (res) {
        // Get starting weight
        for (let i = 0; i < res.length; i++) {
            if (res[i].weight) {
                startWeight = res[i].weight;
            }
        }
        // Get current weight
        for (let i = res.length - 1; i > 0; i--) {
            if (res[i].weight) {
                currentWeight = res[i].weight;                
            }
        }

        var diff = Math.abs(startWeight - currentWeight);
        $('.user-progress').text(diff);
    });
}

function setCurrentWeight(user) {
    var url = '/' + user + '/diary';
    $.getJSON(url, function (res) {
        // response = user's diary
        // loop through diary until a weight value is found
        for (let i = res.length - 1; i > 0; i--)
            if (res[i].weight) {
                $('.current-weight').text(res[i].weight);
                return;
            }
        console.log('No weight found for \'' + user + '\'');
    });
}

function setUser(name) {
    var url = '/search/' + name;
    var req = $.getJSON(url, function (res) {
        console.log(res);
        // Get user's details from response
        var age = res.age;
        var height = res.height;
        var name = res.user;
        var sex = res.sex;

        $(".user-age").text(age);
        $(".user-height").text(height);
        $(".user-name").text(name);
        $(".user-sex").text(sex);
        //user weight
    });

}

function submit() {
    var username = $(".user-name").text();
    var weight = $(":input#weight").val();
    var kcal = $(":input#calories").val();
    var date = today();

    if (username && weight && kcal && date) {
        saveJSON(username, date, weight, kcal);
        return true;
    } else {
        showError("submit");
        return false;
    }
}

function saveJSON(user, date, weight, kcal) {
    var url = '/' + user + '/add/' + date + '/' + weight + '/' + kcal;
    $.getJSON(url);
}

function showError(err) {
    if (err = "submit") alert("Please enter a value for weight and calories");
}

function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}