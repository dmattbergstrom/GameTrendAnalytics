import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import "./Watchlist.css"

// Components
import Table from '../../components/WatchList/Table/Table.jsx';

export default class WatchList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Watchlist container-fluid">
          { this.props.currentUser ?
      			<Table/> : <h4 className="white-text align-center"> You have to sign in to view your watchlist! </h4>}
      </div>
    );
  }
}
