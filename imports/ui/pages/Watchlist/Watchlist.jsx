import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import "./WatchList.css"

const CLIENT_ID = '1p1vbzyuiq4miuyp06p3bbduvj4t4o';

function getTopGames(limit) {
    let url = "https://api.twitch.tv/kraken/games/top?limit="+limit;
    return fetch(url,{headers:{ 'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': CLIENT_ID }})
      .then(processResponse).then((resp)=>console.log(resp))
      .catch(handleError);
};


// API Helper methods
const processResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response;
};

const handleError = (error) => {
  if (error.json) {
    error.json().then(error => {
      console.error('getAllDishes() API Error:', error.message || error);
    })
  } else {
    console.error('getAllDishes() API Error:', error.message || error);
  }
};


// Components
import Table from '../../components/WatchList/Table/Table.jsx';

export default class WatchList extends Component {
  constructor(props) {
    super(props);
    getTopGames(1)
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
