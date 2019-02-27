import React, { Component } from 'react';

// CSS
import './Table.css';

//Components
import Item from '../Item/Item.jsx';
import Button from '../../Button/Button.jsx';

// TODO: Bug with showing buttons/checkboxlist after filtering has been done.
// IDEA: Maybe uncheck all boxes that arent in the current filter? Or fix bug....
// TODO: Fetch from DB.
let testItems = [
  {
    id: "1322",
    gameName: "Game 1",
    category: "trending",
    imgSrc: "https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg"
  },
  {
    id: "1233",
    gameName: "Game 2",
    category: "falling",
    imgSrc: "https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg"
  },
  {
    id: "2233",
    gameName: "Game 3",
    category: "straight",
    imgSrc: "https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg"
  },
];

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.checkBoxHandler = this.checkBoxHandler.bind(this);
    this.showBtnOptions = this.showBtnOptions.bind(this);
    this.filter = this.filter.bind(this);

    const mappedItems = testItems.map((item, index)=>{
      const {id,gameName,category,imgSrc} = item;
      return <Item id={id} key={index} gameName={gameName} category={category} imgSrc={imgSrc} checkBoxHandler={this.checkBoxHandler} />
    });

    this.state = {
      activeFilter: "all",
      items: mappedItems,
      checkedItems: [],
      btnOptions: "",
    }
  }

  /**
  *   checkBoxHandler(): Adds this game ID to our checkedItems state.
  *
  *   These ID's will be passed in to the gameInfo page when we
  *   want to see statistics from multiple pages.
  **/
  checkBoxHandler(e){
    const {checked, id} = e.target;
    let {checkedItems} = this.state;

    if (checked) {
      checkedItems.push(id);
    } else {
      checkedItems.splice(checkedItems.indexOf(id));
    }

    this.setState({
      checkedItems: checkedItems,
      btnOptions: this.showBtnOptions(),
    })
  }

  /**
  *   Rerenders the items that match the category filter.
  **/
  filter(category){
    const mappedItems = testItems.map((item, index)=>{
      if (category == item.category || category == "all") {
        const {id,gameName,category,imgSrc} = item;
        return <Item id={id} key={index} gameName={gameName} category={category} imgSrc={imgSrc} checkBoxHandler={this.checkBoxHandler} />
      }
    });

    this.setState({activeFilter:category, items: mappedItems})
  }

  /**
  *   Shows/Hides Button options if one or more checkboxes are checked.
  **/
  showBtnOptions(){
    let {checkedItems} = this.state;
    if (!checkedItems || checkedItems.length <= 0 || checkedItems === undefined) {
      return "";
    } else {
      return (
        <React.Fragment>
          <Button classes="blue white-text" label="See Stats"/>
          <Button classes="red white-text" label="Remove From Watchlist"/>
        </React.Fragment>
      )
    }
  }

  render() {

    const {activeFilter, items, btnOptions} = this.state;

    // Filter Buttons:
    const btnCategories = ["trending", "straight", "falling", "all"];
    const btnColors = ["inverse-dark-green", "inverse-dark-blue", "inverse-dark-red", "inverse-super-dark"];
    const filterBtns = btnCategories.map((btnCat, index) => {
      let classes = btnColors[index];
      if (activeFilter == btnCat)
        classes += " active-button";
      return <Button key={btnCat} classes={classes} label={btnCat} dataTarget={btnCat} clickHandler={() => this.filter(btnCat)}/>
    });

    return (
      <div className="table-container col-sm-10 offset-sm-1 dark">
          <div className="pull-right">

            <div className="table-buttons">
              {filterBtns}
             </div>

            <div className="table-container">
              <table className="table table-filter">
                <tbody>
                  {items}
                </tbody>
              </table>
            </div>

            <div className="table-buttons">
              {btnOptions}
             </div>
          </div>
      </div>
    );
  }
}
