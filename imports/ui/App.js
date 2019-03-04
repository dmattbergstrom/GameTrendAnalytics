import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Router
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory();

//Collections:
import Games from "/imports/api/collections/games/games.js";

// General Components:
import Navbar from './components/Navbar/Navbar.jsx';

// Page Components
import Overview from './pages/Overview/Overview.jsx';
import Watchlist from './pages/Watchlist/Watchlist.jsx';
import Gameinfo from './pages/Gameinfo/Gameinfo.jsx';

import { Model } from '../api/model.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const spinner = <div className="col s12 text-center"><FontAwesomeIcon size="5x" icon="spinner" spin /></div>;

    // Create Model Instance:
    const {loading, currentUser, games} = this.props;
    let modelInstance;
    if (!loading)
      modelInstance = new Model(games);

    return (
      <div className="App super-dark">
        {/* Navbar + Login! */}
        <Navbar currentUser={currentUser}/>

        {/* App Routes: Show loading until model can be sent down as props. */}
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" render={() => loading ? spinner : <Overview loading={loading} model={modelInstance}/>}/>
            <Route path="/gameinfo" render={() => loading ? spinner : <Gameinfo model={modelInstance}/>}/>
            <Route path="/watchlist" render={() => loading ? spinner : <Watchlist currentUser={currentUser} model={modelInstance}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withTracker(() => {
  // Subscribing to all relevant collections for all pages:
  const handles = [
    Meteor.subscribe('games'),
    Meteor.subscribe('watchlist'),
  ];

  // If handles aren't ready, "loading" will be set to true.
  const loading = handles.some(handle => !handle.ready());
  return {
    loading: loading,
    currentUser: Meteor.user(),
    games: Games.find().fetch()
  };
})(App);
