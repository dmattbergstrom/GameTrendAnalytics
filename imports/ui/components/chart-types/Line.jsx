import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Line extends Component {

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
        dataLabels: {  // Tar bort så att varje punkt inte har en siffra vid sig, kan sättas till true.
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: this.props.week_interval,
          labels: {
            style: {
              colors: '#d8d8d8',
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
        data: this.props.data,  // Data is set to last weeks data.
      }],
    }
  }

  render() {
    return (
      <div className="chartType">
        <Chart options={this.state.options} series={this.state.series} width="100%" height="300" />
      </div>
    );
  }
};

export default Line;
