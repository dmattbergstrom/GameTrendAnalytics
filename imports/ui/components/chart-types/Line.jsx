import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Line extends Component {

  constructor(props) {
    super(props);
    let game_information;

    if(this.props.data.length == 1){  // If we only want to show the data of one game.
      this.data_length = this.props.data[0].game_data.length;
      
      if(this.data_length > 7){
        game_information = [{
          name: "Popularity",
          data: this.props.data[0].game_data.slice((this.data_length-7),this.data_length)
        }]
      } else if(this.data_length <= 7){
        game_information = [{
          name: "Popularity",
          data: this.props.data[0].game_data
        }]
      }
    } else{
      game_information = this.props.data;
    }

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
