import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="Welcome container-fluid">
        <div className="row text-center justify-content-center">
                <div className="col-md-6" id="site-information">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <br/><br/>
                    <Link to="/search">
                        <button type="button">Create new dinner</button>
                    </Link>
                </div>
            </div>
      </div>
    );
  }
}
