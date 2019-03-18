import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Pie extends Component {
      
    constructor(props) {
      super(props);
      const game_names = [];
      const avg_popularity = [];

      this.props.data.forEach(game_data => {
        game_names.push(game_data.name);
        avg_popularity.push(game_data.avg_popularity);
      });
      
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
            labels: game_names,
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
        series: avg_popularity,
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
