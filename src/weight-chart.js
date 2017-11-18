function loadDataFromCSV() {

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
                data: [
                    7074265,
                    1124600,
                    781700,
                    575400,
                    553700,
                    541300,
                    534300,
                    522100,
                    488400,
                    484600,
                    454200
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(145, 255, 140, 0.6)',
                    'rgba(235, 123, 255, 0.6)',
                    'rgba(219, 255, 123, 0.6)',
                    'rgba(130, 142, 255, 0.6)',
                    'rgba(130, 255, 204, 0.6)'
                ]
            }]
        },
        options: {}
    });
});