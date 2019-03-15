import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Line extends Component {

  constructor(props) {
    super(props);
    
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
          categories: ['mon','tue','wed','thu','fri','sat','sun'],//this.props.week_interval,
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
        data: [11,12,13,14,15,16,17]//this.props.data,  // Data is set to last weeks data.
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
