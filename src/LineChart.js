import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import './App.css';


function LineChart(props) {
    const chartContainer = useRef(null);
  
    useEffect(() => {
      if (chartContainer && chartContainer.current) {
        new Chart(chartContainer.current, {
            type: 'line',
            data: {
                labels: Array(props.data.length).fill().map( (e , index , data ) => props.start + index),
                datasets: [{
                    fill : false , 
                    data: props.data,
                    borderColor: [
                        props.color
                    ],
                    borderWidth: 2
                }]
            }, 
            options : {
                legend: {
                    display: false
                },
                responsive : true ,
                maintainAspectRatio : false ,
                tooltips: {
                    callbacks: {
                       label: function(tooltipItem) {
                              return tooltipItem.yLabel;
                       }
                    }
                }
            }
        });
       
      }
    }, [chartContainer]);
  
    return (
      <div className="LineChart">
        <canvas ref={chartContainer} />
      </div>
    );
}

export default LineChart;
