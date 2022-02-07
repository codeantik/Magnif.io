import React from 'react';

export default function PieChart(){

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     14],
      ['Eat',      17],
      ['Sleep',    84]
    ]);

    var options = {
      legend:'none',
      colors:['#00caca','#1ca2f8','#4a7d99'],
      backgroundColor:'none',
      pieSliceTextStyle: {
        color: 'none',
      },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  return <div id="piechart" style={{width:'100%',height:'100%'}}></div>
}