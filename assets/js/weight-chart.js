function trendLinear(xData, yData) {
	if (xData.length !== yData.length) throw 'Length of x and y data does not match';
	var n = xData.length - 1;
	return {
		x1: xData[1],
		x2: xData[n],
		y1: yData[1],
		y2: yData[n]
	};

}

$(function () {
	$.getJSON('http://127.0.0.1:8080/assets/data/user-diary.json', function (data) {
		var diary = {
			dates: [],
			weights: [],
			calories: []
		};
		var i = 0;
		data.diary.forEach(entry => {
			diary.dates[i] = moment(entry.date, 'DD-MM-YYYY');
			diary.weights[i] = entry.weight;
			diary.calories[i] = entry.calories;
			i++;
		});
		var trendPoints = trendLinear(diary.dates, diary.weights);

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
					lineTension: 0,
					borderColor: 'rgb(80, 130, 190)',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
					pointHitRadius: 10,
					pointBorderColor: 'rgba(0, 50, 100, 0.6)',
					pointBorderWidth: 2,
					borderJoinStyle: 'round',

				}, {
					// Dashed NULL sections
					data: diary.weights,

					fill: false,
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
				}, {
					// Trend line
					data: [{
						x: trendPoints.x1,
						y: trendPoints.y1,
					}, {
						x: trendPoints.x2,
						y: trendPoints.y2
					}],
					borderColor: 'rgba(220, 100, 40, 0.5)',
					pointRadius: 10,
					fill: false,
					borderDash: [5, 1],
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
					filter: function (tooltipItems) {
						if (tooltipItems.datasetIndex === 0) return true;
					},
					callbacks: {
						label: function (tooltipItems, data) {
							return tooltipItems.yLabel + ' Kg';
							//return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' Kg';
						}
					}
				},
				hover: {
					mode: 'index',
					intersect: false,
				},
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							stepSize: 1,
							unit: 'day',
							displayFormats: {
								'day':'DD MMM'
							},
							tooltipFormat: 'DD-MMM-YYYY',
						},
						ticks: {
							callback: function(dataLabel, index) {
                                // Only show every 7th label. Return null to hide the grid line too
								return index % 7 === 1 ? dataLabel : '';							
                            },
							autoSkip: false,
							fontSize: 10,
							minRotation: 0,
							maxRotation: 0,
							padding: -25,
						},
						gridLines: {
							
						}
					}],
					yAxes: [{
						ticks: {
							fontSize: 10,
							display: true,
							padding: -23,
							labelOffset: 7,
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