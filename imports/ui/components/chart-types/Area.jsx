import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Area extends Component {

  constructor(props) {
    super(props);
    // this.data = [];  // An array that contains last weeks data. 
    // this.week_interval = [];  
    // this.props.data.forEach(day => {        
    //   this.data.push(day.popularity);
    //   this.week_interval.push(day.dow);
    // });

    this.state = {
      options: {
        title: {
            text: 'Streams last week',
            align: 'center',
            margin: 0,
            offsetX: 0,
            offsetY: 10,
            floating: false,
            style: {
              fontSize:  '20px',
              color:  '#d8d8d8'
            },
        },
        dataLabels: {
          enabled: false
        },
        fill: {  // Lägger en gradient på arean under grafen.
          type: 'gradient',
              gradient: {
                shade: "dark",
                shadeIntensity: 0.6,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
              }
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: this.props.week_interval,
          labels: {
            style: {
              colors: '#d8d8d8', // Kan göra en array av denna om man vill ka olika färger på mån -> sön.
            },
          },
        },

        yaxis: {
        show: true,
        showAlways: true,
        labels: {
            show: true,
            style: {
                color: "#d8d8d8",
            },
          },
        },
      },
      series: [{
        name: "Streams (thousand)",
        data: this.props.data,
      }],
    }
  }

  render() {
    return (
      <div className="chartType">
        <Chart options={this.state.options} series={this.state.series} type="area" width="100%" height="300" />
      </div>
    );
  }
};

export default Area;
