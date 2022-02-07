import React from 'react'

export default function FileUploadChart(){
  
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
  var data = google.visualization.arrayToDataTable([
      ['Language', 'Speakers (in millions)'],
      ['German',  5.85],
      ['French',  1.66],
      ['india', 1]
  
    ]);

  var options = {
    legend: 'none',
    pieSliceText: 'label',
    colors:['#9ecbd7','#007090','#3c9295'],
    backgroundColor:'none',
    pieSliceTextStyle: {
      color: 'none',
    },
  
  };

    var chart = new google.visualization.PieChart(document.getElementById('file-upload-charts'));
    chart.draw(data, options);
  }

  return <div id="file-upload-charts" style={{ height: "90%", width: "90%" }}></div>
}