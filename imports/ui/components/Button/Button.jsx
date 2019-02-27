import React, { Component } from 'react';

// CSS
import "./Button.css";

export default class Button extends Component {
  render() {
    const {classes, dataTarget, clickHandler, label} = this.props;
    return (
      <button type="button" className={"button hoverable "+classes} data-target={dataTarget} onClick={clickHandler}>{label}</button>
    );
  }
}
