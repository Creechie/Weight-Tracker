function multiplyArrays(a1, a2) {
	if (a1.length !== a2.length) throw 'multiplyArrays: Length of arrays do not match';
	var result = [];
	for (let i = 0; i < a1.length; i++)
		if (a1[i] !== null && a2[i] !== null)
			result[i] = a1[i] * a2[i];
	return result;
}

function sumArray(array) {
	var total = 0;
	array.forEach(value => {
		if (value !== null && !isNaN(value))
			total += value;
	});
	return total;
}

function countNulls(array) {
	var count = 0;
	array.forEach(value => {
		if (value === null)
			count++;
	});
	return count;
}

function calculateTrendPoints(xData, yData) {
	var X, Y, nullCount, n, sumX, sumY, sumXY, sumXX, m;
	X = xData;
	Y = yData;

	nullCount = countNulls(yData);
	n = X.length - nullCount;
	
	sumX = sumArray(X);
	sumY = sumArray(Y);
	sumXY = sumArray(multiplyArrays(X, Y));
	sumXX = sumArray(multiplyArrays(X, X));

	// Calculate trend line slope - m
	m = ((n * sumXY) - (sumX * sumY)) / ((n * sumXX) - (sumX * sumX));

	// Calculate trend line offset - c
	var c = (sumY - (m * sumX)) / n;

	// Calculate array of trend line points (y = mx + c)
	var trendPoints = [];
	for (let i = 0; i < n + nullCount; i++)
		if (X[i] != null)
			trendPoints[i] = m * X[i] + c;
	return trendPoints;
}

$(function () {
	// https://undaunted-confessio.000webhostapp.com/assets/data/user-diary.json
	// http://localhost:8080/assets/data/user-diary.json
	$.getJSON('http://localhost:8080/assets/data/user-diary.json', function (data) {
		var diary = {
			id: [],
			dates: [],
			weights: [],
			calories: []
		};
		var i = 0;
		data.diary.forEach(entry => {
			diary.id[i] = entry.id;
			diary.dates[i] = moment(entry.date, 'DD-MM-YYYY');
			diary.weights[i] = entry.weight;
			diary.calories[i] = entry.calories;
			i++;
		});

		// Clone diary object into an array
		diaryClone = $.extend(true, {}, diary);
		var noNullDiary = $.map(diaryClone, function (value, index) {
			return [value];
		})

		// Remove (delete ID) elements from clone, where weight = null
		var initialLength = noNullDiary[0].length;
		for (let i = 0; i < noNullDiary[0].length; i++) {
			if (noNullDiary[2][i] === null) {
				noNullDiary[0][i] = null;
			}
		}

		// Trend line calculation
		var x = noNullDiary[0]; // (0,1,2,3,...,n)
		var y = noNullDiary[2];

		var trendPoints = calculateTrendPoints(x, y);

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
					borderColor: '#0070f1',
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
					borderWidth: 1,
					borderDash: [5, 2],
					pointRadius: 0,
					pointHoverRadius: 0,
					pointHitRadius: 0,
					borderJoinStyle: 'bevel',
				}, {
					// Trend line
					data: trendPoints,
					borderColor: 'rgba(220, 100, 40, 0.5)',
					pointRadius: 0,
					pointHoverRadius: 0,
					pointHitRadius: 0,
					spanGaps: true,
					fill: false,
					borderDash: [5, 1],
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					caretSize: 10,
					cornerRadius: 15,
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
								'day': 'D MMM'
							},
							tooltipFormat: 'DD-MMM-YYYY',
						},
						ticks: {
							callback: function (dataLabel, index) {
								// Only show every 7th label. Return null to hide the grid line too
								return index % 7 === 1 ? dataLabel : '';
							},
							autoSkip: false,
							fontSize: 10,
							minRotation: 0,
							maxRotation: 0,
							padding: -15,
						},
						gridLines: {
							drawTicks: false,
						}
					}],
					yAxes: [{
						ticks: {
							fontSize: 10,
							display: true,
							padding: -23,
							labelOffset: 8,
						}

					}]
				},
				legend: {
					display: false
				},
			}
		});
	});
});