import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import Welcome from './pages/Welcome.js';

// NOTE: ONLY FOR TESTING:
import Line from './components/chart-types/Line.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <AccountsUIWrapper />
          <Line></Line>

          {/* this.props.currentUser ?
            IF LOGGED IN
          */}

        </header>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
