import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// Routes
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Components
import Welcome from './pages/Welcome.js';
import Gameinfo from './pages/Gameinfo.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

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
            <Route exact path="/" render={()=>""}/>
            <Route path="/welcome" render={()=><Welcome/>}/>
            <Route path="/gameinfo" render={()=><Gameinfo/>}/>
          </Switch>
        </Router>

      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
