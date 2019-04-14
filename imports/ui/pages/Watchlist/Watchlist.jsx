import React, { Component } from 'react';

import "./Watchlist.css"

// Components
import Table from '../../components/WatchList/Table/Table.jsx';

export default class Watchlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Watchlist container-fluid">
          { this.props.currentUser ?
      			<Table model={this.props.model}/> : <h4 className="white-text align-center"> You have to sign in to view your watchlist! </h4>}
      </div>
    );
  }
}
