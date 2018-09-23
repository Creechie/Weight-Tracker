$(function () {
    // $('#btn-sidebar-toggle').click(function(e) {
    //     e.preventDefault();
    //     $("#wrapper").toggleClass("toggled");
    // });
    $('#newEntry').click(function (err) {
        err.preventDefault();
        $("#inputBox").fadeIn(function () {
            // Animation complete
        });
    });
    $('#submit').click(function (err) {
        err.preventDefault();
        submit();
    });
});

function submit() {
    var username = $("#username").text();
    var weight = $(":input#weight").val();
    var kcal = $(":input#calories").val();
    var date = today();

    saveJSON(username, date, weight, kcal);
}

function saveJSON(user, date, weight, kcal) {
    var req = '/' + user + '/add/' + date + '/' + weight + '/' + kcal;
    $.getJSON(req);
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