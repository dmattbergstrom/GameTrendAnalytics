import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './accounts-config.js'; // Import account config

// Only Import BootstrapJS, since we have installed CSS locally. (Because of MeteorJS load order.)
import 'bootstrap/dist/js/bootstrap.js';

// Import FontAwesome Icons:
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faCheck, faSpinner);

// Import App Layout where all pages will be rendered:
import App from "../../ui/App.js";

Meteor.startup(() => {
  render(<App/>, document.getElementById('render-target'));
});
