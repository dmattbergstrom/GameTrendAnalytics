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
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        data: [40, 25, 50, 49, 21, 70, 51],
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
