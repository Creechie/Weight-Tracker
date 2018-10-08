$(function () {
    setStartingWeight("Charlie Creech");
    setCurrentWeight("Charlie Creech");

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

function setStartingWeight(user) {
    var url = '/' + user + '/diary';
    $.getJSON(url, function (res) {
        // response = user's diary
        // loop through diary until a weight value is found
        for (let i = 0; i < res.length; i++)
            if (res[i].weight) {
                $('#start-weight').text(res[i].weight);
                return;
            }
        console.log('No initial weight found for \'' + user + '\'');
    });
}

function setCurrentWeight(user) {
    var url = '/' + user + '/diary';
    $.getJSON(url, function (res) {
        // response = user's diary
        // loop through diary until a weight value is found
        for (let i = res.length-1; i > 0; i--)
            if (res[i].weight) {
                $('.current-weight').text(res[i].weight);
                return;
            }
        console.log('No weight found for \'' + user + '\'');

    });
}

function submit() {
    var username = $(".username").text();
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
    var req = '/' + user + '/add/' + date + '/' + weight + '/' + kcal;
    $.getJSON(req);
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