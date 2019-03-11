import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';  
import Line from '../../components/chart-types/Line.jsx';
import Area from '../../components/chart-types/Area.jsx';
import { modelInstance } from '../../../api/model.js';
import './Gameinfo.css';
import '../../../../client/css/custom-radio-checkbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Gameinfo extends Component {
  constructor(props) {
    super(props);
    this.game = modelInstance.getSpecificGame(1);  // 1 => this.props.id, ska ändras när vi senare ankallar Gameinfo komponenten
    this.data = [];  // An array that contains last weeks data. 
    this.week_interval = [];  
    this.game.data.forEach(day => {        
      this.data.push(day.popularity);
      this.week_interval.push(day.dow);
    });

    this.state = {
      id : this.game._id, // this.props.game.id
      title : this.game.name, // this.props.game.title
      data : this.data,
      week_interval : this.week_interval,
      selectedOption : "lineChart",  // Default är lineChart,
      isChecked : false,
    };
   
  }

  componentDidMount(){  // Is a method that runs when the component is created. It checks if the game is in the users watchlist or not.
    this.userWatchlist = modelInstance.getWatchlist();
    this.userWatchlist.forEach(gameId =>{
      if(this.state.id == gameId){
        console.log("exists");
        this.setState({
          isChecked : true,
        });
      }
    });
  }

  chartToShow = e => {
    this.setState({
      selectedOption : e.target.value,
    });
  }

  addToWatchlistChanged = e => {
    if(!this.state.isChecked){  // Adds or removes the game from the users watchlist
      // console.log("add");      
      modelInstance.addToWatchlist(this.state.id);
    }else{
      // console.log("remove");      
      modelInstance.removeFromWatchlist(this.state.id);
    }

    this.setState({
      isChecked : !this.state.isChecked,
    });
  }

  render() {
    let activeChart;
    let {title, selectedOption} = this.state;

    if (this.state.selectedOption == 'lineChart'){
      activeChart = <Line data={this.state.data} week_interval={this.state.week_interval} />;
    } else if(this.state.selectedOption == 'areaChart'){
      activeChart = <Area data={this.state.data} week_interval={this.state.week_interval} />;
    }

    return (
      <div className="container-fluid">
            <div className="row text-center justify-content-center">
                <div className="col-md-8 col-sm-12 mt-4" id="gameinfo">
                      <div>
                        <h2 className="dark-green-text">{title}</h2>
                      </div>

                      <div className="container-fluid" id="chart">                        
                        <div className="row container-fluid" id="chartList">
                          <form className="col-md-3 col-sm-12" id="typeOfChartForm"> 
                          { this.props.currentUser ?
                              <div className="form-check checkbox" id="addToWatchlist">
                                  <label>
                                    <input className="" id="addToWatchlist_checkbox" type="checkbox" name="checkbox" onChange={this.addToWatchlistChanged} checked={this.state.isChecked} />
                                    <span className="cr"><FontAwesomeIcon className="cr-icon green-text" icon="check" /></span>
                                    {this.state.isChecked ? '' : <span>Add to watchlist!</span>}                                    
                                  </label>                                    
                              </div>                              
                               : ''
                          }                           
                              <div className="form-check radiobox">                                
                                <label>                                  
                                  <input className="form-check-input" type="radio" name="chartType" id="lineChart" value="lineChart" checked={selectedOption === "lineChart"} onChange={this.chartToShow} />
                                  <span>Line</span>
                                </label>    
                              </div>

                              <div className="form-check radiobox">                                
                                <label>
                                  <input className="form-check-input" type="radio" name="chartType" id="areaChart" value="areaChart" checked={selectedOption === "areaChart"} onChange={this.chartToShow} />
                                  <span>Area</span>
                                </label>
                              </div>
                          </form>

                          <div className="col-md-9 col-sm-12" id="chartContainer">
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
