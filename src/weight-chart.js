/** 
 * Returns an array of all items with a specifed index from the user-diary.json. 
 * @param {!number} index 0 = date string | 1 = weight | 2 = calories
 *//**
 * Returns an array of all items with a specifed index from the user-diary.json. 
 * @param {!string} label "date" | "weight" | "calories"
 * */
function loadDataFromDiary(index) {
}


$(function () {
    let myChart = document.getElementById('weightChart').getContext('2d');

    let massPopChart = new Chart(weightChart, {
        type: 'line', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: [
                'London',
                'Birmingham',
                'Leeds',
                'Sheffield',
                'Cornwall',
                'Manchester',
                'Bradford',
                'Co. Durham',
                'Wiltshire',
                'Liverpool',
                'Bristol'
            ],
            datasets: [{
                label: 'Population',
                data: [ loadDataFromDiary() ],
                backgroundColor: ['rgba(255, 99, 132, 0.6)']
            }]
        },
        options: {}
    });
});