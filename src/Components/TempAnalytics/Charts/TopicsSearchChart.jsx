import React from 'react';

export default function TopicSearchChart() {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 6],
      ['Eat', 6],
      ['Commute', 3],
      ['Watch TV', 6],
      ['tv more',10],
      ['mobile',9],
      ['Mobile lenovo',29]

    ]);

    var options = {
     legend:{alignment:'center',position:'bottom'},
      pieHole: 0.85,
      backgroundColor: 'none',
      colors:['#9ecbd7','#1ca2f8','#4a7d99','#3c9295'],

      pieSliceTextStyle: {
        color: 'none',
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }

  return <div id="donutchart" style={{ width: '100%', height: '100%' }}></div>
}
