import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// FontAwesome Icons:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Components
import Item from '../Item/Item.jsx';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  // TODO: Do similiar in REACT STATE instead!
  // Find the "category" field of each game id, in DB.
  // And display accordingly.
  filter(target){
    if (target != 'all') {
      $('.table tr').css('display', 'none');
      $('.table tr[data-status="' + target + '"]').fadeIn('slow');
    } else {
      $('.table tr').css('display', 'none').fadeIn('slow');
    }
  }

  render() {
    return (
      <div className="table-container col-sm-10 offset-sm-1 dark">
          <div className="pull-right">

            <div className="table-filter-buttons">
              <button type="button" className="button inverse-dark-green hoverable btn-filter" data-target="trending" onClick={() => this.filter("trending")}>Trending</button>
              <button type="button" className="button inverse-dark-blue hoverable btn-filter" data-target="straight" onClick={() => this.filter("straight")}>Straight</button>
              <button type="button" className="button inverse-dark-red hoverable btn-filter" data-target="falling" onClick={() => this.filter("falling")}>Falling</button>
              <button type="button" className="button inverse-super-dark hoverable btn-filter active-button" data-target="all" onClick={() => this.filter("all")}>All</button>
             </div>

            <div className="table-container">
              <table className="table table-filter">
                <tbody>
                  {/* TODO: create map in render() to loop all items!*/}
                  <Item/>
                </tbody>
              </table>
            </div>

          </div>
      </div>
    );
  }
}
