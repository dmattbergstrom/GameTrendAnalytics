import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// FontAwesome Icons:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Components
import Item from '../Item/Item.jsx';

// TODO: Fetch from DB.
let testItems = [
  {
    gameName: "Game 1",
    category: "trending",
    imgSrc: "https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg"
  },
  {
    gameName: "Game 2",
    category: "falling",
    imgSrc: "https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg"
  },
  {
    gameName: "Game 3",
    category: "straight",
    imgSrc: "https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg"
  },
];

export default class Table extends Component {
  constructor(props) {
    super(props);

    let mappedItems = testItems.map((item, index)=>
      <Item key={index} gameName={item.gameName} category={item.category} imgSrc={item.imgSrc} />
    );

    this.state = {
      activeFilter: "all",
      Items: mappedItems
    }
  }

  // TODO: Do similiar in REACT STATE instead!
  // Find the "category" field of each game id, in DB.
  // And display accordingly.
  filter(category){

    let mappedItems = testItems.map((item, index)=>{
      if (category == item.category || category == "all") {
        return <Item key={index} gameName={item.gameName} category={item.category} imgSrc={item.imgSrc} />
      }
    });

    this.setState({activeFilter:category, Items: mappedItems})

  }

  render() {
    return (
      <div className="table-container col-sm-10 offset-sm-1 dark">
          <div className="pull-right">


            <div className="table-filter-buttons">
              <button type="button" className={"button hoverable btn-filter inverse-dark-green " + (this.state.activeFilter == 'trending' ? 'active-button' : '')} data-target="trending" onClick={() => this.filter("trending")}>Trending</button>
              <button type="button" className={"button hoverable btn-filter inverse-dark-blue " + (this.state.activeFilter == 'straight' ? 'active-button' : '')} data-target="straight" onClick={() => this.filter("straight")}>Straight</button>
              <button type="button" className={"button hoverable btn-filter inverse-dark-red " + (this.state.activeFilter == 'falling' ? 'active-button' : '')} data-target="falling" onClick={() => this.filter("falling")}>Falling</button>
              <button type="button" className={"button hoverable btn-filter inverse-super-dark " + (this.state.activeFilter == 'all' ? 'active-button' : '')} data-target="all" onClick={() => this.filter("all")}>All</button>
             </div>

            <div className="table-container">
              <table className="table table-filter">
                <tbody>
                  {this.state.Items}
                </tbody>
              </table>
            </div>

          </div>
      </div>
    );
  }
}
