import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

// CSS
import "./Overview.css"

// Components
import DynamicLine from "../../components/chart-types/DynamicLine.jsx";

export default class Overview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Overview">
        <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 container-fluid">
          <br/><br/>
          <h4 className="white-text"><b>TOP 10 GAMES LAST 7 DAYS</b></h4>
          <DynamicLine/>
        </div>
      </div>
    );
  }
}