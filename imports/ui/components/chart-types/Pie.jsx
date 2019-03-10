import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Pie extends Component {
      
    constructor(props) {
      super(props);

      this.state = {
        options: {
            title: {
                text: 'Popularity distribution',
                align: 'center',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '20px',
                  color:  '#d8d8d8'
                },
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return Math.round(val) + "%"
                },
                style: {
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    colors: ["#eee"],
                },
            },
        },
        series: [44, 55, 13, 43, 22],
      }
    }

    render() {
      return (
        <div className="chartType">
            <Chart id="PieChart" options={this.state.options} series={this.state.series} type="pie" width="100%" height="400" />
        </div>
      );
    }
}

export default Pie;
