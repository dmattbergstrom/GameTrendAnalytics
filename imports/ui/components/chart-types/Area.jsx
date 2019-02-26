import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Area extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
            return val
        },
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: '#eee'
        },
        dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.45
        }
      },
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
        <Chart options={this.state.options} series={this.state.series} type="area" width="100%" height="300" />
      </div>
    );
  }
};

export default Area;
