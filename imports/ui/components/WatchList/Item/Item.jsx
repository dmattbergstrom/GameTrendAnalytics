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
    let categoryClasses = "media-meta pull-right ";
    if (this.props.category == "trending") {
      categoryClasses += "green-text";
    } else if (this.props.category == "straight") {
      categoryClasses += "blue-text";
    } else if (this.props.category == "falling") {
      categoryClasses += "red-text";
    }

    return (
      <tr data-status={this.props.category}>
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
              <img src={this.props.imgSrc} className="media-photo"/>
            </a>
          </div>
        </td>
        <td>
          <div className="media-body">
            <span className={categoryClasses}>{this.props.category.toUpperCase()}</span>
            <p className="title">
              <a href="">{this.props.gameName}</a>
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
