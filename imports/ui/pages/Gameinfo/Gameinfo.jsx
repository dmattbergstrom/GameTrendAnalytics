import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';
import Line from '../../components/chart-types/Line.jsx';
import Area from '../../components/chart-types/Area.jsx';
import { modelInstance } from '../../../api/model.js';

export default class Gameinfo extends Component {
  constructor(props) {
    super(props);
    modelInstance.getAllGames;
    modelInstance.getSpecificGame;
    this.state = {
      id : 1, // this.props.game.id
      title : "Apex Legends", // this.props.game.title
      selectedOption : "lineChart",  // Default är lineChart
    }
  }

  chartToShow = e => {
    this.setState({
      selectedOption : e.target.value,
    });
  }

  render() {
    let activeChart;
    let {title, selectedOption} = this.state;

    if (this.state.selectedOption == 'lineChart'){
      activeChart = <Line />;
    } else if(this.state.selectedOption == 'areaChart'){
      activeChart = <Area />;
    }

    return (
      <div className="container-fluid">
            <div className="row text-center justify-content-center">
                <div className="col-md-8 col-sm-12 mt-4" id="gameinfo">
                      <div>
                        <h2 className="dark-green-text">{title}</h2>
                      </div>

                      <div className="container-fluid" id="chart">
                        <div className="row container-fluid">
                          <form className="col-sm-3" id="typeOfChartForm">
                              <div className="form-check radiobox">
                                <input className="form-check-input" type="radio" name="chartType" id="lineChart" value="lineChart" checked={selectedOption === "lineChart"} onChange={this.chartToShow} />
                                <label className="form-check-label" htmlFor="lineChart">
                                  Line
                                </label>
                              </div>

                              <div className="form-check radiobox">
                                <input className="form-check-input" type="radio" name="chartType" id="areaChart" value="areaChart" checked={selectedOption === "areaChart"} onChange={this.chartToShow} />
                                <label className="form-check-label" htmlFor="areaChart">
                                  Area
                                </label>
                              </div>
                          </form>

                          <div className="col-sm-9" id="chartContainer">
                            {activeChart}
                          </div>
                        </div>

                        <hr />

                        <div id="otherGameInformation">
                          <h3>Other information</h3>
                            {/*
                              Kan vi här sammanställa den datan vi har i text? Exempelvis säga om den gått upp eller ner
                              trending/falling/straight osv?
                             */}
                        </div>
                      </div>
                </div>
            </div>
      </div>
    );
  }
}
