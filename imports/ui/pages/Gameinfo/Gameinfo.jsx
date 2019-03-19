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
    const game_id = window.location.href.split("/").slice(-1)[0]; // The id of the game is in the URL. Gets it go do a call to the model.
    this.game = modelInstance.getSpecificGame(game_id);  // 1 => this.props.id, ska ändras när vi senare ankallar Gameinfo komponenten
    if(this.game == undefined){  // Checks if game is valid/exists, for errorhandling. GÖR OM? ÄR DETTA FULT?
      this.valid_game = false;

      this.state = {
        id : game_id, // this.props.game.id
        title : "", // this.props.game.title
        selectedOption : "",  // Default är lineChart,
        isChecked : false,
        img : "",
      };
    } else{
      this.valid_game = true;

      this.state = {
        id : this.game._id, // this.props.game.id
        title : this.game.name, // this.props.game.title
        selectedOption : "lineChart",  // Default är lineChart,
        isChecked : false,
        img : this.game.img,
      };
    }    
  }

  componentDidMount(){  // Is a method that runs when the component is created. It checks if the game is in the users watchlist or not.
    this.userWatchlist = modelInstance.getWatchlist();
    this.userWatchlist.items.forEach(game =>{
      // console.log(game);
      if(this.state.id == game._id){
        // console.log("exists");
        this.setState({
          isChecked : true,
        });
      }
    });
  }

  chartToShow = e => {  // Toggles which chart to show, is called onChange on the radioboxes.
    this.setState({
      selectedOption : e.target.value,
    });
  }

  addToWatchlistChanged = e => { 
    
    if(!this.state.isChecked){
      console.log("add");      
      modelInstance.addToWatchlist(this.state.id, this.state.title);
    }else{
      console.log("remove");      
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
      activeChart = <Line games={[this.game]} />;
    } else if(this.state.selectedOption == 'areaChart'){
      activeChart = <Area games={[this.game]} />;
    }

    return (
      <div className="container-fluid">
            <div className="row text-center justify-content-center">
                <div className="col-md-8 col-sm-12 mt-4" id="gameinfo">
                {this.valid_game ?
                  <div>
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
                          {/*<h3>Other information</h3>*/}
                            {/*
                              Kan vi här sammanställa den datan vi har i text? Exempelvis säga om den gått upp eller ner
                              trending/falling/straight osv?
                             */}
                             <img src={this.state.img} alt="No image found" />
                        </div>
                      </div>      
                  </div>          
                : <h2><a className="dark-green-text" href="/">Game doesn't exists go back to overview</a></h2>}
                </div>
            </div>
      </div>
    );
  }
}
