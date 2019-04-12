import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class UnvalidChart extends Component {
      
    constructor(props) {
      super(props);      
            
    }

    render() {
      return (
        <div className="chartType unvalidChart">
            <h4 class="text-center red-text text-darken-2">Data-load was insufficient. Refresh the page to retrieve complete data.</h4>
        </div>
      );
    }
}

export default UnvalidChart;
