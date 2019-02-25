import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './accounts-config.js'; // Import account config
import "../../api/api-client.js";// Import collections:

import App from "../../ui/App.js";


Meteor.startup(() => {
  render(<App/>, document.getElementById('render-target'));
});
