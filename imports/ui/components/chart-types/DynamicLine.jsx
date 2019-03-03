import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class DynamicLine extends Component {

  constructor(props) {
    super(props);

    let seriesData = [
      {name: "NAME", data: [1,2,3,4,5,6,7]},
      {name: "NAME", data: [11,22,33,44,55,66,77]},
      {name: "NAME", data: [11,12,13,14,15,16,17]}
    ];

    this.state = {
      options: {
        colors: ['#17a2b8', '#eee', '#9C27B0'],
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
        <Chart options={this.state.options} series={this.state.series} type="line" width="100%" height="300" />
      </div>
    );
  }
};

export default DynamicLine;
