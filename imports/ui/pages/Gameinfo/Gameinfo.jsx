import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';  
import Line from '../../components/chart-types/Line.jsx';
import Area from '../../components/chart-types/Area.jsx';
import UnvalidChart from '../../components/chart-types/UnvalidChart.jsx';
import OtherInformation from '../../components/GameInfoComp/OtherInformation.jsx';
import './Gameinfo.css';
import '../../../../client/css/custom-radio-checkbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Gameinfo extends Component {
  constructor(props) {
    super(props);
    const game_id = window.location.href.split("/").slice(-1)[0]; // The id of the game is in the URL. Gets it go do a call to the model.
    this.game = this.props.model.getSpecificGame(game_id);  // 1 => this.props.id, ska ändras när vi senare ankallar Gameinfo komponenten
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
        valid_data: true,
      };
    }    
  }

  componentWillMount() {
    // If the model hasn't loaded in it's necessary data, please do so after App mounting.
    if (this.valid_game){
      Tracker.autorun(() => {
        const {loading, model} = this.props;
        const MIN_DATA = 3;
        if(!loading) {

          const game_id = window.location.href.split("/").slice(-1)[0];
          this.game = model.getSpecificGame(game_id);

          // Data-proofing: Did we get all necessary data?
          if (model.getGames().length > 0 ) {
            let topGames = model.getTopGames();

            // Retry to set data until successful.
            const {length} = this.game.data;
            while (length < 0) {
              this.game = model.getSpecificGame(game_id);
            }

            if ( length > 0) {
              // Set data.
              this.game = model.getSpecificGame(game_id);

              // Not enough data was loaded in. Prompt user to refresh page.
              if (length < MIN_DATA) {
                this.state.valid_data = false // If data is not sufficient, or enough. 
              }
            }
          }
        }
      });
    }
  }

  componentDidMount(){  // Is a method that runs when the component is created. It checks if the game is in the users watchlist or not.
    this.userWatchlist = this.props.model.getWatchlist();
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
      this.props.model.addToWatchlist(this.state.id, this.state.title);
    }else{
      console.log("remove");      
      this.props.model.removeFromWatchlist(this.state.id);
    }

    this.setState({
      isChecked : !this.state.isChecked,
    });
    
  }

  render() {
    let activeChart;
    let {title, selectedOption, valid_data} = this.state;

    if (selectedOption == 'lineChart'){
        activeChart = <Line games={[this.game]} />;
    } else if(selectedOption == 'areaChart'){
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
                        
                        <br/>
                        {valid_data ? "" : <UnvalidChart />}

                        <hr />

                        <div id="otherGameInformation">                          
                            <OtherInformation gameInfo={this.game} />                         
                        </div>
                      </div>      
                  </div>          
                : <h2 className="dark-green-text">Game doesn't exists, please go back to <a className="goBackLink blue-text" href="/">Overview</a></h2>}
                </div>
            </div>
      </div>
    );
  }
}
