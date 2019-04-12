import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class UnvalidChart extends Component {
      
    constructor(props) {
      super(props);      
            
    }

    render() {
      return (
        <div className="chartType">
            <h2>Data-load was insufficient. Please refresh page!</h2>
        </div>
      );
    }
}

export default UnvalidChart;
