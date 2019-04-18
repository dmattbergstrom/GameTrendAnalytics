import React, { Component } from 'react';
import Item from "..//WatchList/Item/Item.jsx";

// This is a presentation comonent presenting other information, in this case just an image of the game.
export default class OtherInformation extends Component {
  constructor(props) {
    super(props);  // The prop is gameInfo wich contain all information regarding the game.
    this.mapGames = this.props.getTopGames.map((game, index) => {      
        const {_id, name, status, logo} = game;
        return (
        '<hr />',
        <Item
            id={_id} key={index} name={name}
            status={status} logo={logo}
            checkbox={false}
        />
        )
    });
  }
  

  render() {
    return(
        <React.Fragment>
            <h2>Top 5 games</h2>          
            <div className="table-container">
              <table className="table table-filter white-text">
                <tbody>                  
                  {this.mapGames}
                </tbody>
              </table>
            </div>
        </React.Fragment>
    );
  }
}
