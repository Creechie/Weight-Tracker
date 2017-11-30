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
            type: 'line',
            data: {
                labels: diary.dates,
                datasets: [{
                    label: 'Weight', 
                    data: diary.weights,

                    // Chart options
                    backgroundColor: 'rgba(79, 129, 189, 0.7)',
                    fill: false,
                    spanGaps: true,
                    // Line options
                    lineTension: 0.1,
                    borderColor: 'rgb(79, 129, 189)',
                    borderWidth: 3,
                    // Point options
                    pointStyle: 'dot',
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 10,
                    pointBorderColor: 'rgba(0, 0, 0, 0.5)',
                    pointBorderWidth: 2,
                }]
            },
            options: {
                
                
            }
        });
    });
});