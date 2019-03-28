import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

// CSS
import "./Overview.css"

// Components
import DynamicLine from "../../components/chart-types/DynamicLine.jsx";
import Line from "../../components/chart-types/Line.jsx";
import Pie from "../../components/chart-types/Pie.jsx";
import { modelInstance } from '../../../api/model';

export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top_games: modelInstance.getTopGames(),
    };
    
  }

  componentWillMount() {
    // If the model hasn't loaded in it's necessary data, please do so after App mounting.
    Tracker.autorun(() => {
      const {loading} = this.props;
      if(!loading) {

        // Data-proofing: Did we get all necessary data?
        if (modelInstance.getTopGames().length > 0 ) {
          let topGames = modelInstance.getTopGames();

          // Retry to set data until successful.
          const {length} = modelInstance.getTopGames()[0].data;
          while (length < 0) {
            topGames = modelInstance.getTopGames();
          }

          if ( length > 0) {
            // Set data.
            this.setState({
              top_games: topGames,
            });

            // Not enough data was loaded in. Prompt user to refresh page.
            if (length < 5) {
              alert("Data-load was insufficient. Please refresh page.");
            }
          }
        }
      }
    });
  }

  render() {
    const {model} = this.props;
      
    return (
      <div className="Overview">
        <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 container-fluid">
          <br/><br/>
          <h4 className="white-text text-center" id="overview-header"><b>TOP 5 GAMES LAST 7 DAYS</b></h4>
          <Line games={this.state.top_games} />
          <Pie games={this.state.top_games}/>
          <button onClick={() => { console.log(model.getGames()) }}> TEST </button>
        </div>
      </div>
    );
  }
}
