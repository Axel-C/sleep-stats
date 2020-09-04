import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import './App.css';


function MixedChart(props) {
    const chartContainer = useRef(null);
  
    useEffect(() => {
      if (chartContainer && chartContainer.current) {
        new Chart(chartContainer.current, {
            type: 'line',
            data: {
                labels: Array(props.data[0].length).fill().map( (e , index , data ) => props.start + index),
                datasets: [{
                    fill : false , 
                    data: props.data[0],
                    borderColor: [
                        "red"
                    ],
                    borderWidth: 2
                },{
                    fill : false , 
                    data: props.data[1],
                    borderColor: [
                        "blue"
                    ],
                    borderWidth: 2
                },{
                    fill : false , 
                    data: props.data[2],
                    borderColor: [
                        "orange"
                    ],
                    borderWidth: 2
                }
            ]
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
      <div className="MixedChart">
        <canvas ref={chartContainer} />
      </div>
    );
}

export default MixedChart;
