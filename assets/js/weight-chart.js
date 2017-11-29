$(function () {
    $.getJSON('http://127.0.0.1:8080/assets/data/user-diary.json', function (data) {

        var diary = {dates:[], weights:[]};
        var i = 0;
        data.diary.forEach(entry => {
            diary.dates[i] = entry.date;
            diary.weights[i] = entry.weight;
            i++;
        });

        let myChart = document.getElementById('weightChart').getContext('2d');

        let massPopChart = new Chart(weightChart, {
            type: 'line', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data: {
                labels: diary.dates,
                datasets: [{
                    label: 'Weight', 
                    data: diary.weights,
                }]
            },
            options: {}
        });
    });
});