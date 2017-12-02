
$(function () {
    $.getJSON('http://127.0.0.1:8080/assets/data/user-diary.json', function (data) {

        var diary = {
            dates: [],
            weights: [],
            calories: []
        };
        var i = 0;
        data.diary.forEach(entry => {
            diary.dates[i] = entry.date.slice(0, -5);
            diary.weights[i] = entry.weight;
            diary.calories[i] = entry.calories;
            i++;
        });
        
        var myChart = document.getElementById('weightChart').getContext('2d');
        var massPopChart = new Chart(weightChart, {
            type: 'line',
            data: {
                labels: diary.dates,
                datasets: [{
                    label: 'Weight',
                    data: diary.weights,

                    backgroundColor: 'rgba(80, 130, 190, 0.5)',
                    fill: false,
                    spanGaps: false,
                    lineTension: 0.2,
                    borderColor: 'rgb(80, 130, 190)',
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 10,
                    pointBorderColor: 'rgba(0, 50, 100, 0.6)',
                    pointBorderWidth: 2,
                    borderJoinStyle: 'round'
                }, {
                    // Dashed NULL sections
                    data: diary.weights,

                    fill: true,
                    backgroundColor: 'rgba(80, 130, 190, 0.05)',
                    spanGaps: true,
                    lineTension: 0,
                    borderColor: 'rgb(80, 130, 190)',
                    borderWidth: 1.5,
                    borderDash: [5, 2],
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    pointHitRadius: 0,
                    borderJoinStyle: 'bevel',
                }
                }]
            },
            options: {
                tooltips: {
                    caretSize: 10,
                    cornerRadius: 10,
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    titleMarginBottom: 2,
                    bodyFontSize: 15,
                    bodyFontColor: '#000',
                    backgroundColor: 'rgba(80, 130, 190, 0.2)',
                    borderWidth: 2,
                    borderColor: 'rgba(0, 50, 100, 0.8)',
                    displayColors: false,
                    yAlign: 'bottom',
                    xAlign: 'center',
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    yAxes: [{
                      ticks: {
                        //mirror: true
                      }
                    }],
                    xAxes: [{
                        ticks: {
                          fontSize: 10,
                          //autoSkip: false,
                          maxRotation: 0,
                          minRotation: 0
                        }
                      }]
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    });
});