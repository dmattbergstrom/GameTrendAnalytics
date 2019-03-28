import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// CSS
import "./Item.css";

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {id, status, logo, name, checkBoxHandler, isChecked, checkbox} = this.props;

    let statusClasses = "media-meta pull-right ";
    if (status == "trending") {
      statusClasses += "green-text";
    } else if (status == "straight") {
      statusClasses += "blue-text";
    } else if (status == "falling") {
      statusClasses += "red-text";
    }

    return (
      <tr data-status={status}>
        <td>
          {checkbox ? 
            <div className="checkbox">
              <label>
              <input id={id} onChange={checkBoxHandler} type="checkbox" name="checkbox" value="" defaultChecked={isChecked}/>
              <span className="cr"><FontAwesomeIcon className="cr-icon green-text" icon="check" /></span>
              </label>
            </div>
          : ""}
        </td>        
        <td>
          <div className="media">
            <a href="#" className="pull-left">
              <img src={logo} className="media-photo"/>
            </a>
          </div>
        </td>
        <td>
          <div className="media-body">
            <span className={statusClasses}>{status.toUpperCase()}</span> 
            <p className="title">
              <a href={"/gameinfo/"+id}>{name}</a>
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
