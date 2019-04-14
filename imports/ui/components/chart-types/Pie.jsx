import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Pie extends Component {
      
    constructor(props) {
      super(props);
      const game_names = [];
      const avg_popularity = [];

      this.props.games.forEach(game => {
        game_names.push(game.name);
        avg_popularity.push(game.avg_popularity);
      });
      
      this.state = {
        options: {
            title: {
                text: 'Popularity distribution',
                align: 'center',
                margin: 0,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '20px',
                  color:  '#d8d8d8'
                },
            },
            labels: game_names,
            legend: {
              offsetY: 0,
              position: "bottom",
              floating: false,
              horizontalAlign: "left",   
              verticalAlign: "left",              
            },            
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return Math.round(val) + "%"
                },
                style: {
                    fontSize: '13px',
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
            <Chart id="PieChart" options={this.state.options} series={this.state.series} type="pie" width="350" height="350" />
        </div>
      );
    }
}

export default Pie;
