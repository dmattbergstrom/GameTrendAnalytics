import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// CSS
import "./Item.css";

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {id, category, imgSrc, gameName, checkBoxHandler, isChecked} = this.props;

    let categoryClasses = "media-meta pull-right ";
    if (category == "trending") {
      categoryClasses += "green-text";
    } else if (category == "straight") {
      categoryClasses += "blue-text";
    } else if (category == "falling") {
      categoryClasses += "red-text";
    }

    return (
      <tr data-status={category}>
        <td>
        <div className="checkbox">
          <label>
           <input id={id} onChange={checkBoxHandler} type="checkbox" name="checkbox" value="" defaultChecked={isChecked}/>
           <span className="cr"><FontAwesomeIcon className="cr-icon green-text" icon="check" /></span>
           </label>
        </div>
        </td>
        <td>
          <div className="media">
            <a href="#" className="pull-left">
              <img src={imgSrc} className="media-photo"/>
            </a>
          </div>
        </td>
        <td>
          <div className="media-body">
            <span className={categoryClasses}>{category.toUpperCase()}</span>
            <p className="title">
              <a href="">{gameName}</a>
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
