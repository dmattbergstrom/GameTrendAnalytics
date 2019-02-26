import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// FontAwesome Icons:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr data-status="trending">
        <td>
        <div className="checkbox">
          <label>
           <input type="checkbox" name="o3" value=""/>
           <span className="cr"><FontAwesomeIcon className="cr-icon green-text" icon="check" /></span>
           </label>
        </div>
        </td>
        <td>
          <div className="media">
            <a href="#" className="pull-left">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" className="media-photo"/>
            </a>
          </div>
        </td>
        <td>
          <div className="media-body">
            <span className="media-meta pull-right green-text">TRENDING</span>
            <p className="title">
              <a href="">Lorem Impsum</a>
            </p>
          </div>
        </td>
        <td>
          <p></p>
        </td>
      </tr>

    );
  }
}
