import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

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
  ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    ), document.getElementById('render-target'));
});
