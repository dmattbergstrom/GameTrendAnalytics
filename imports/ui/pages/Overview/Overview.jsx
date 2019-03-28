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
import Item from "../../components/WatchList/Item/Item.jsx";

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.getTopGames = this.props.model.getTopGames();
    this.mapGames = this.getTopGames.map((game, index) => {      
      console.log(game._id);
      
      const {_id, name, status, logo} = game;
      return (<Item
          id={_id} key={index} name={name}
          status={status} logo={logo}
          checkbox={false}
        />)
      });
    this.state = {
      top_games: this.mapGames,
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
      <div className="Overview row">
        <div className="col-md-4 col-lg-4 white-text" id="gameRow">
          <h2>Top 5 games</h2>          
          <div className="table-container">
              <table className="table table-filter white-text">
                <tbody>
                  {/* <tr><td>Counterstrike</td></tr>
                  <tr><td>Just Chat</td></tr>
                  <tr><td>League of Legends</td></tr>
                  <tr><td>Dota 2</td></tr>
                  <tr><td>Sekiro: Shadow Die Twice</td></tr> */}
                  {this.state.top_games}
                </tbody>
              </table>
            </div>
        </div>
        <div className="col-sm-12 col-md-7 col-lg-6 container-fluid">
          <br/><br/>
          <h4 className="white-text text-center" id="overview-header"><b>TOP 5 GAMES LAST 7 DAYS</b></h4>
          <Line games={this.getTopGames} />
          <Pie games={this.getTopGames}/>
        </div>
      </div>
    );
  }
}
