$(function () {
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

function submit() {
    var username = $(".username").text();
    var weight = $(":input#weight").val();
    var kcal = $(":input#calories").val();
    var date = today();

    if (username && weight && kcal && date) {
        saveJSON(username, date, weight, kcal);
        return true;
    }
    else {
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

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}