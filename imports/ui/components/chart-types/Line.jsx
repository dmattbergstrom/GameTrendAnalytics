import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Line extends Component {

  /**
   * 
   * @param {games} props
   * Contains an array with with all games that should be presented in the array (one or more). 
   */

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
        dataLabels: {  // Tar bort så att varje punkt inte har en siffra vid sig, kan sättas till true.
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],//this.props.data.week_interval,
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
      series: game_information,
    }
  }

  render() {
    return (
      <div className="chartType">
        <Chart id="LineChart" options={this.state.options} series={this.state.series} width="100%" height="300" />
      </div>
    );
  }
};

export default Line;
