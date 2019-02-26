import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';
import Line from '../components/chart-types/Line.jsx';
import Area from '../components/chart-types/Area.jsx';

export default class Gameinfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id : 1, // this.props.game.id
      title : "Apex Legends", // this.props.game.title
    }
  }

  render() {
    return (
      <div className="container-fluid">
            <div className="row text-center justify-content-center">
                <div className="col-md-8 col-sm-12 mt-4" id="gameinfo">
                      <div>
                        <h2 className="dark-green-text">{this.state.title}</h2>
                      </div>

                      <div className="container-fluid" id="chart">
                        <div className="row container-fluid">
                          <form className="col-sm-3" id="typeOfChartForm">
                              <div className="form-check radiobox">
                                <input className="form-check-input" type="radio" name="chartType" id="lineChart" value="lineChart" defaultChecked />
                                <label className="form-check-label" htmlFor="lineChart">
                                  Line
                                </label>
                              </div>

                              <div className="form-check radiobox">
                                <input className="form-check-input" type="radio" name="chartType" id="areaChart" value="areaChart" />
                                <label className="form-check-label" htmlFor="areaChart">
                                  Area
                                </label>
                              </div>
                          </form>

                          <div className="col-sm-9" id="chartContainer">
                            {/* INSERT CHART HERE */}
                            <Line />
                            {/* <Area /> */}                            
                          </div>
                        </div>

                        <hr />

                        <div id="otherGameInformation">
                          <h3>Other information</h3>
                        </div>
                      </div>
                </div>
            </div>
      </div>
    );
  }
}
