import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './accounts-config.js'; // Import account config
import "../../api/api-client.js";// Import collections:

// Only Import BootstrapJS, since we have installed CSS locally. (Because of MeteorJS load order.)
import 'bootstrap/dist/js/bootstrap.js';

import App from "../../ui/App.js";

Meteor.startup(() => {
  render(<App/>, document.getElementById('render-target'));
});
