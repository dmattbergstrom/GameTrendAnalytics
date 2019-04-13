import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// CSS
import "./Overview.css"

// Components
import Line from "../../components/chart-types/Line.jsx";
import Pie from "../../components/chart-types/Pie.jsx";
import UnvalidChart from "../../components/chart-types/UnvalidChart.jsx";
import GameTable from "../../components/OverviewComponents/GameTable.jsx";


export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.getTopGames = this.props.model.getTopGames();    
    this.state = {
      top_games: this.getTopGames,
      valid_data: true,
    };
    
  }

  componentWillMount() {
    // If the model hasn't loaded in it's necessary data, please do so after App mounting.
    Tracker.autorun(() => {
      const MIN_DATA = 5;
      const {loading, model} = this.props;
      if(!loading) {

        // Data-proofing: Did we get all necessary data?
        if (model.getTopGames().length > 0 ) {
          let topGames = model.getTopGames();

          // Retry to set data until successful.
          const {length} = model.getTopGames()[0].data;
          while (length < 0) {
            topGames = model.getTopGames();
          }

          if ( length > 0) {
            // Set data.
            this.setState({
              top_games: topGames,
            });

            // Not enough data was loaded in. Prompt user to refresh page.
            if (length < MIN_DATA) {
              this.state.valid_data = false; // Change to false!!
            }
          }
        }
      }
    });
  }

  render() {
    const {model} = this.props;
    const {valid_data} = this.state;
      
    return (
      <div className="Overview row container-fluid">
        <div className="col-md-3 col-lg-3 col-sm-12 white-text" id="gameRow">
          <div className="d-block d-md-none" id="on-mobile">
              <h3 data-toggle="collapse" data-target="#top-games-container">Click to view games!!!!</h3>
          </div>
          <div className="collapse d-lg-block d-md-block" id="top-games-container">
            <GameTable getTopGames={this.getTopGames} />
          </div>          
        </div>
        <div className="col-sm-12 col-md-8 col-lg-8 container-fluid">
          <br/><br/>
          <h4 className="white-text text-center" id="overview-header"><b>TOP 5 GAMES LAST 7 DAYS</b></h4>
          {valid_data ? <Line games={this.getTopGames} /> : <React.Fragment><Line games={this.getTopGames} /><UnvalidChart /></React.Fragment>}          
          <Pie games={this.getTopGames}/>
        </div>
      </div>
    );
  }
}
