$(function () {
    initialise();

    $('#new-entry').click(function (err) {
        err.preventDefault();
        $(".modal").fadeIn("fast");
    });
    $('.modal-submit').click(function (err) {
        err.preventDefault();
        if (submit())
            $('.modal').fadeOut("fast");
    });
    $('.modal-cancel').click(function (err) {
        err.preventDefault();
        $(".modal").fadeOut("fast");
    });

    $('#test-new-row').click(function (err) {
        err.preventDefault();
        newRow();
    });

    $('#test-load').click(function (err) {
        err.preventDefault();
        populateTable("Charlie Creech");
    });
});

function initialise() {
    setUser("Charlie Creech"); // To be replaced with a login page
    calculateProgress("Charlie Creech");
    setCurrentWeight("Charlie Creech");
}

function populateTable(user) {
    var url = '/search/' + user + '/';
    $.getJSON(url, function (res) {
        var diary = res.diary;
        var weight, calories;
        var date;
        var prevWeight = []; // Last week's weights
        var cellHTML;
        var entryIndex = 0;

        var firstDate = new Date(strToDate(diary[entryIndex].date));
        var startOfWeek = new Date(weekStart(firstDate));

        // Loop through diary
        var endOfDiary = false;
        while (!endOfDiary) {
            newRow();
            populateDate(startOfWeek);

            if (entryIndex >= 7)
                prevWeight = weight;
            else {
                // Use starting weight
                for (let i = 0; i < diary.length - 1; i++) {
                    if (diary[i].weight) {
                        prevWeight = diary[i].weight;
                        break;
                    }
                }
            }

            weight = [];
            calories = [];

            // Populate Mon - Sun
            for (var d = 0; d < 7; d++) {
                if (entryIndex < diary.length) {
                    date = new Date(strToDate(diary[entryIndex].date))

                    var weekDay = startOfWeek.addDays(d);
                    if (date.getTime() == weekDay.getTime()) {

                        weight[d] = (diary[entryIndex].weight);
                        calories[d] = diary[entryIndex].calories;

                        cellHTML = '<ul>';
                        cellHTML += '   <li class="data-weight">' + weight[d] + '</li>';
                        cellHTML += '   <li class="data-cal">' + calories[d] + '</li>';
                        cellHTML += '</ul>';

                        $('#tdee-table tr:last-child td:eq(' + (d + 2) + ')').html(cellHTML);
                        entryIndex++;
                    }
                } else {
                    endOfDiary = true;
                }
            }

            // Populate weekly averages
            var weightAvg = (average(weight) ? average(weight) : '');
            var calorieAvg = (average(calories) ? average(calories) : '');
            cellHTML = '<ul>';
            cellHTML += '   <li>' + round1DP(weightAvg) + '</li>';
            cellHTML += '   <li>' + parseInt(calorieAvg) + '</li>';
            cellHTML += '</ul>';
            $('#tdee-table tr:last-child .table-avg').html(cellHTML);

            // Populate weekly delta
            var prevWeightAvg = average(prevWeight);
            var delta = weightAvg - prevWeightAvg;
            $('#tdee-table tr:last-child .table-delta').html(round2DP(delta));

            // calculate TDEE
            var calsInKG = 7716.17455; // Calories in 1KG of fat
            var sumTDEE; // Sum of last 5 weeks TDEE values
            var TDEEs = []; // Stores historical TDEEs. Used to calculate sumTDEE
            
            for (let i = 0; i < 5; i++) {
                // Get last 5 TDEEs (less if there aren't yet 5)
                TDEEs[i] = 0;
            }

            var TDEE = (calorieAvg + (((-delta) * calsInKG) / 7));
            var averageTDEE = (TDEE + sumTDEE) / TDEEs.length;

            startOfWeek = new Date(startOfWeek.addDays(7));
        }
    });
}

function average(values) {
    var sum = 0;
    var count = values.length;

    if (count) { // Is values an array?
        for (var i = 0; i < values.length; i++)
            if (parseFloat(values[i])) sum += parseFloat(values[i]);
            else count -= 1;
        if (count > 0) return sum / count;
    } else {
        // If values is not an array
        return values;
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function strToDate(dateString) {
    var splitDate = dateString.split("-");
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
}

function newRow() {
    var table = document.getElementById('tdee-table');
    var newRow = table.insertRow(-1);
    var rowCount = table.rows.length;

    var rowHTML =
        '<td class="table-week"></td>' +
        '<td class="table-stats">' +
        '   <ul>' +
        '       <li>Weight</li>' +
        '       <li>Cal.</li>' +
        '   </ul>' +
        '</td>';

    // Empty cells for Mon - Sun
    for (var day = 0; day < 7; day++) rowHTML += '<td class="table-data"></td>'
    // Empty cells for Average, delta, and TDEE
    rowHTML += '<td class="table-avg"></td>'
    rowHTML += '<td class="table-delta"></td>'
    rowHTML += '<td class="table-tdee"></td>'

    newRow = $('#tdee-table tr:last');
    newRow.html(rowHTML);
}

function populateDate(date) {
    var monday = dateToStr(date);
    $('#tdee-table tr:last-child td:eq(0)').html(monday);
}

// Starting weight - current weight
function calculateProgress(user) {
    var startWeight;
    var currentWeight;

    // Get user's diary
    var url = '/search/' + user + '/';
    $.getJSON(url, function (res) {
        var diary = res.diary;

        // Get current weight
        currentWeight = diary[diary.length - 1].weight;

        // Get starting weight
        for (let i = 0; i < diary.length - 1; i++) {
            if (diary[i].weight) {
                startWeight = diary[i].weight;
                break;
            }
        }

        var diff = round1DP(Math.abs(startWeight - currentWeight));
        $('.user-progress').text(diff);

        // Calculate remaining weight until goal
        var goal = res.goal;
        var remaining = round1DP(currentWeight - goal);
        $('.user-remaining').text(remaining);

    });
}

function setCurrentWeight(user) {
    var url = '/' + user + '/diary';
    $.getJSON(url, function (res) {
        // response = user's diary
        // loop through diary until a weight value is found
        for (let i = res.length - 1; i > 0; i--)
            if (res[i].weight) {
                var currentWeight = round1DP(res[i].weight);
                $('.current-weight').text(currentWeight);
                return;
            }
        alert('No weight found for \'' + user + '\'');
    });
}

function setUser(name) {
    var url = '/search/' + name;
    var req = $.getJSON(url, function (res) {
        // Get user's details from response
        var age = res.age;
        var height = res.height;
        var name = res.user;
        var sex = res.sex;

        $(".user-age").text(age);
        $(".user-height").text(height);
        $(".user-name").text(name);
        $(".user-sex").text(sex);
    });

}

function submit() {
    var username = $(".user-name").text();
    var weight = $(":input#weight").val();
    var kcal = $(":input#calories").val();
    var date = dateToStr(today());

    if (username && weight && kcal && date) {
        saveJSON(username, date, weight, kcal);
        initialise();
        refreshTable()
        return true;
    } else {
        showError("submit");
        return false;
    }
}

function refreshTable() {
    $("#tdee-table").load("assets/html/table-init.html");
    setTimeout(function () {
        populateTable("Charlie Creech");
    }, 100); // Wait 100ms for $.load to finish before re-populating

    // $("#tdee-table").load("assets/html/table-init.html");
    // populateTable("Charlie Creech");
}

function saveJSON(user, date, weight, kcal) {
    var url = '/' + user + '/add/' + date + '/' + weight + '/' + kcal;
    $.getJSON(url);
}

function showError(err) {
    if (err == "submit") alert("Please enter a value for weight and calories");
}

function dateToStr(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0
    var yyyy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '-' + mm + '-' + yyyy;
}

function today() {
    return new Date();
}

function weekStart(date) {
    // Set date to first day of the week
    var day = date.getDay();
    var diff = date.getDate() - day + (day == 0 ? -6 : 1); // Adjust when Sunday (Sunday == 0)
    date.setDate(diff);

    return date;
}

function getShortMonth(month) {
    switch (month) {
        case 0:
            return "Jan"
        case 1:
            return "Feb"
        case 2:
            return "Mar"
        case 3:
            return "Apr"
        case 4:
            return "May"
        case 5:
            return "Jun"
        case 6:
            return "Jul"
        case 7:
            return "Aug"
        case 8:
            return "Sep"
        case 9:
            return "Oct"
        case 10:
            return "Nov"
        case 11:
            return "Dec"
        default:
            return "???"
    }
}

function round1DP(x) {
    return Number.parseFloat(x).toFixed(1);
}

function round2DP(x) {
    return Number.parseFloat(x).toFixed(2);
}