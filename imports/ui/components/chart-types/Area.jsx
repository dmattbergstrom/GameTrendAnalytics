import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Area extends Component {

  constructor(props) {
    super(props);
    let game_information = [];
    this.props.games.forEach(game => {
      var data_length = game.data.length;
      var data_last_week = [];
       
     if(this.data_length > 7){
        game.data.slice((data_length-7), data_length).forEach(day =>{
          data_last_week.push(day.popularity);
        });
        game_information.push(
          {
            name: game.name,
            data: data_last_week
          }
        );
      } else if(data_length <= 7){
        game.data.forEach(day =>{
          data_last_week.push(day.popularity);
        });        
        game_information.push({
          name: game.name,
          data: data_last_week
        });
      }
    });

    this.state = {
      options: {
        title: {
            text: 'Popularity last week',
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
        dataLabels: {
          enabled: false
        },
        fill: {  // Lägger en gradient på arean under grafen.
          type: 'gradient',
              gradient: {
                shade: "dark",
                shadeIntensity: 0.6,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
              }
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],//this.props.week_interval,
          labels: {
            style: {
              colors: '#d8d8d8', // Kan göra en array av denna om man vill ka olika färger på mån -> sön.
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
      series: game_information,
    }
  }

  render() {
    return (
      <div className="chartType">
        <Chart options={this.state.options} series={this.state.series} type="area" width="100%" height="300" />
      </div>
    );
  }
};

export default Area;
