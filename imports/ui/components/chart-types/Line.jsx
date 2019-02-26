import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Line extends Component {

  constructor(props) {
    super(props);

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
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      },
      series: [{
        data: [40, 25, 50, 49, 21, 70, 51]
      }],
    }
  }

  render() {
    return (
      <div className="line">
        <Chart options={this.state.options} series={this.state.series} type="line" width="100%" height="300" />
      </div>
    );
  }
};

export default Line;
