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
import { modelInstance } from '../../../api/model';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.getTopGames = modelInstance.getTopGames();
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
    console.log(this.mapGames);
    
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
          <button onClick={() => { console.log(model.getGames()) }}> TEST </button>
        </div>
      </div>
    );
  }
}
