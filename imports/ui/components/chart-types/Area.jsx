import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Area extends Component {

  constructor(props) {
    super(props);
    this.data_length = this.props.data.length;
    
    if(this.data_length > 7){
      this.data = this.props.data.slice((this.data_length-7),this.data_length);
    } else if(this.data_length <= 7){
      this.data = this.props.data;
    }

    this.state = {
      options: {
        title: {
            text: 'Streams last week',
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
          categories: ['mon','tue','wed','thu','fri','sat','sun'],//this.props.week_interval,
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
      series: [{
        name: "Streams (thousand)",
        data: this.data,//this.props.data,
      }],
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
