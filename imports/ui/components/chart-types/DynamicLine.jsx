import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class DynamicLine extends Component {

  constructor(props) {
    super(props);

    let seriesData = [  // TODO: Replace seriesData variable with a variable from model.
      {name: "Game1", data: [1,2,3,4,5,6,7]},
      {name: "Game2", data: [8,22,33,44,55,66,77]},
      {name: "Game3", data: [11,11,13,13,14,14,12]},
      {name: "Game4", data: [12,17,13,14,15,16,14]},
      {name: "Game5", data: [13,63,11,66,15,19,57]},
      {name: "Game6", data: [14,41,22,55,16,5,27]},
      {name: "Game7", data: [15,12,44,44,17,23,77]},
      {name: "Game8", data: [16,42,33,12,18,44,1]},
      {name: "Game9", data: [17,22,66,20,19,100,7]},
      {name: "Game10", data: [11,12,63,1,55,8,10]},
    ];

    this.state = {
      options: {
        colors: ['#20c997', '#17a2b8', '#FD6585'],
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          labels: {
            style: {
              colors: '#fff', // Kan göra en array av denna om man vill ka olika färger på mån -> sön.
            },
          },
        },

        yaxis: {
        show: true,
        showAlways: true,
        labels: {
            show: true,
            style: {
              color: "#fff",
            },
          },
        },
      },
      series: seriesData,
    }
  }

  render() {
    return (
      <div className="chartType">
        <Chart id="DynamicLine" options={this.state.options} series={this.state.series} type="line" width="100%" height="300" />
      </div>
    );
  }
};

export default DynamicLine;
