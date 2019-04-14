import React, { Component } from 'react';

// This is a presentation comonent presenting other information, in this case just an image of the game.
export default class OtherInformation extends Component {
  constructor(props) {
    super(props);  // The prop is gameInfo wich contain all information regarding the game.
  }

  render() {
    return(
        <React.Fragment>
            <img src={this.props.gameInfo.img} alt="No image found" />
        </React.Fragment>
    );
  }
}
