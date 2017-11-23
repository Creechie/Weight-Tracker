function loadJSON(callback) {
   




    // var xobj = new XMLHttpRequest();
    // xobj.open('GET', url);

    // xobj.responseType = 'json';
    // xobj.send();

    // xobj.onload = function() {
    //     var data = xobj.response;
    // };



    // xobj.overrideMimeType("application/json");
    // xobj.open('GET', url);
    // xobj.onreadystatechange = function() {
    //     if (xobj.readyState == 4 && xobj.status == "200") {
    //         callback(xobj.responseText);
    //     }
    // };
    // xobj.send(null);
}

/**
 * Returns the value with specifed index and label from user-diary.json.
 * @param {number} index The index of the item
 * @param {(number|string)} label (0 | "date") | (1 | "weight") | (2 | "calories")
 * @returns {(number|string)} Value with specifed index and label from user-diary.json.
 * */
function getItemFromDiary(index, label) {

}

/** 
 * Returns all items with the specifed label from the user-diary.json. 
 * @param {(number|string)} label (0 | "date") | (1 | "weight") | (2 | "calories")
 * @returns {(number[]|string[])} All items with the specifed label from the user-diary.json
 * */
function getAllFromDiary(label) {

}

$(function () {
    console.log('Hello');

    let url = 'http://127.0.0.1:1337/bin/data/user-diary.json';
    
    var jsonResult;

    console.log('Requesting JSON');
    $.getJSON(url, function(data) {
        console.log('Success\n');
        console.log(data);
    })
    .fail(function(data, textStatus, error) {
        if (!error) console.error("JSON request failed.\n-Status: " + textStatus + "\n-Error: Violating Same-origin policy");
        else console.error("JSON request failed.\n-Status: " + textStatus + "\n-Error: " + error);
    })
    .always(function(data) {
        console.log("JSON request complete");
    });




    //// Parse JSON into object
    // loadJSON(function(response) {
    //     var diary = JSON.parse(response);
    //     console.log(diary);
    // });

    let myChart = document.getElementById('weightChart').getContext('2d');

    let massPopChart = new Chart(weightChart, {
        type: 'line', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: getAllFromDiary("date"),
            datasets: [{
                label: 'Weight',
                data: getAllFromDiary("weight")
            }]
        },
        options: {}
    });
});