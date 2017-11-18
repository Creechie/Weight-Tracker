/** 
 * Returns an array of all items from the specifed index from the user-diary.json. 
 * @param {(number|string)} index (0 | "date") | (1 | "weight") | (2 | "calories")
 * @returns {(number[]|string[])} All items from the specifed index from the user-diary.json
 * */
function loadDataFromDiary(index) {}


$(function () {
    let myChart = document.getElementById('weightChart').getContext('2d');

    let massPopChart = new Chart(weightChart, {
        type: 'line', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: loadDataFromDiary("date"),
            datasets: [{
                label: 'Weight',
                data: loadDataFromDiary("weight")
            }]
        },
        options: {}
    });
});