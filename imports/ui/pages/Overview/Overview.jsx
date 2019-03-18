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
    }
  }

  render() {
    const {model} = this.props;
      
    return (
      <div className="Overview">
        <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 container-fluid">
          <br/><br/>
<<<<<<< HEAD
          <h4 className="white-text text-center" id="overview-header"><b>TOP 10 GAMES LAST 7 DAYS</b></h4>
          <DynamicLine/>
          <Pie/>
          <button onClick={() => { console.log(model.getTopGames()) }}> TEST </button>
=======
          <h4 className="white-text text-center" id="overview-header"><b>TOP 5 GAMES LAST 7 DAYS</b></h4>
          <Line data={this.state.top_games} />
          <Pie data={this.state.top_games}/>
          <button onClick={() => { console.log(model.getGames()) }}> TEST </button>
>>>>>>> b89b456ecfe0a56640855f798a564eec02c90d3e
        </div>
      </div>
    );
  }
}
