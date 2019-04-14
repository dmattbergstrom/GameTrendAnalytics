import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Router
import { Route, Switch } from 'react-router';

//Collections:
import Games from "/imports/api/collections/games/games.js";
import { default as Wl } from "/imports/api/collections/watchlist/watchlist.js";

// General Components:
import Navbar from './components/Navbar/Navbar.jsx';

// Page Components
import Overview from './pages/Overview/Overview.jsx';
import Watchlist from './pages/Watchlist/Watchlist.jsx';
import Gameinfo from './pages/Gameinfo/Gameinfo.jsx';

import { modelInstance } from '../api/model.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // If the model hasn't loaded in it's necessary data, please do so after App mounting.
    Tracker.autorun(() => {
      const modelGames = modelInstance.getGames();
      const modelWatchlist = modelInstance.getWatchlist();

      if (modelGames === undefined || modelGames.length == 0) {
        const games = Games.find({}).fetch();
        modelInstance.setGames(games);
      }

      if (modelWatchlist.items === undefined || modelWatchlist.items.length == 0) {
        const watchlist = Wl.find({}).fetch()[0];
        modelInstance.setWatchlist(watchlist);
      }
    });
  }

  render() {
    // Create spinner that spins while data is loading.
    const { loading, currentUser } = this.props;
    const spinner = <div className="col s12 text-center"><FontAwesomeIcon size="5x" icon="spinner" spin /></div>;
    return (
      <div className="App super-dark">
        {/* Navbar + Login! */}
        <Navbar loading={loading} currentUser={currentUser} model={modelInstance} />

        {/* App Routes: Show loading until model can be sent down as props. */}
        <Switch>
          <Route exact path="/" render={() => loading ? spinner : <Overview loading={loading} model={modelInstance} />} />
          <Route path="/gameinfo" render={() => loading ? spinner : <Gameinfo currentUser={currentUser} model={modelInstance} />} />
          <Route path="/watchlist" render={() => loading ? spinner : <Watchlist currentUser={currentUser} model={modelInstance} />} />
        </Switch>
      </div>
    );
  }
}

export default withTracker(() => {

  // Does data need to be loaded?
  let loading = true;
  const modelGames = modelInstance.getGames();
  const modelWatchlist = modelInstance.getWatchlist();

  const dataMissing = (modelWatchlist.items === undefined || modelWatchlist.items.length == 0 || modelGames === undefined || modelGames.length == 0);

  // Data is missing. Subscribe to all relevant collections for all pages:
  if (dataMissing) {
    const handles = [
      Meteor.subscribe('games'),
      Meteor.subscribe('watchlist'),
    ];

    // If handles aren't ready, "loading" will be set to true.
    loading = handles.some(handle => !handle.ready());
  } else {
    loading = false; // data wasn't missing.
  }

  return {
    loading: loading,
    currentUser: Meteor.user()
  };
})(App);
