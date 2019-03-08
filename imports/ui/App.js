import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// Routes
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

// General Components:
import Navbar from './components/Navbar/Navbar.jsx';

// Page Components
import Overview from './pages/Overview/Overview.jsx';
import Watchlist from './pages/Watchlist/Watchlist.jsx';
import Gameinfo from './pages/Gameinfo/Gameinfo.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App super-dark">
        {/* Navbar + Login! */}
        <Navbar currentUser={this.props.currentUser}/>

        {/* App Routes */}
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" render={()=><Overview/>}/>
            <Route path="/gameinfo" render={()=><Gameinfo currentUser={this.props.currentUser}/>}/>
            <Route path="/watchlist" render={()=><Watchlist currentUser={this.props.currentUser}/>}/>
          </Switch>
        </Router>

      </div>
    );
  }
}

export default withTracker(() => {
  // Subscribing to all relevant collections for all pages:
  Meteor.subscribe('games');
  Meteor.subscribe('watchlist');
  return {
    currentUser: Meteor.user(),
  };
})(App);
