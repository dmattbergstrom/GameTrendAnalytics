import React, { Component } from 'react';

// CSS
import './Table.css';

//Components
import Item from '../Item/Item.jsx';
import Button from '../../Button/Button.jsx';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.checkBoxHandler = this.checkBoxHandler.bind(this);
    this.showBtnOptions = this.showBtnOptions.bind(this);
    this.filter = this.filter.bind(this);
    this.mapWatchlistItems = this.mapWatchlistItems.bind(this);
    this.removeFromWL = this.removeFromWL.bind(this);

    this.state = {
      checkedItems: []
    }

    const mappedItems = this.mapWatchlistItems("all");
    this.state = {
      activeFilter: "all",
      checkedItems: [],
      btnOptions: "",
      items: mappedItems
    };
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
  *   Rerenders the items that match the status filter.
  **/
  filter(status){
    const mappedItems = this.mapWatchlistItems(status);
    this.setState({activeFilter:status, items: mappedItems})
  }

  mapWatchlistItems(category){
    const games = this.props.model.getGames();
    const watchlist = this.props.model.getWatchlist().items;
    const mappedItems = watchlist.map((item, index)=>{
      const { _id, name } = item;
      const { logo, status } = games[_id]; // get status / logo from DB.
      if (category == status || category == "all") {
        const isChecked = this.state.checkedItems.includes(_id);
        return (
          <Item
            id={_id} key={index} name={name}
            status={status} logo={logo}
            checkBoxHandler={this.checkBoxHandler} isChecked={isChecked}
          />
        );
      }
    });
    return mappedItems;
  }

  removeFromWL(){
    let { checkedItems } = this.state;
    let newCheckedItems = checkedItems.slice();
    let rmIndices = [];
    checkedItems.forEach((id, index) => {
      this.props.model.removeFromWatchlist(id);
      rmIndices.push(index);
    });

    rmIndices.forEach(cIndex => {
      newCheckedItems = newCheckedItems.splice(cIndex, 1);
    });

    // TODO: Investigate bug.
    console.log(newCheckedItems);
    this.setState({ checkedItems: newCheckedItems.slice() });
    console.log(this.state.checkedItems);
    const mappedItems = this.mapWatchlistItems(this.state.activeFilter);
    this.setState({ items: mappedItems}); // Update watchlist items.
    console.log(this.state.checkedItems);
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
          <Button classes="red white-text" label="Remove From Watchlist" clickHandler={this.removeFromWL}/>
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
