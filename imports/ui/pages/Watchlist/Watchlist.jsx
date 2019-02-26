import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import "./Watchlist.css"

// FontAwesome Icons:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Watchlist extends Component {
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
      <div className="Watchlist container-fluid">
<h1 className="white-text"></h1>
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
        									<tr data-status="trending">
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
        													<img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" className="media-photo"/>
        												</a>
        											</div>
        										</td>
                            <td>
                              <div className="media-body">
                                <span className="media-meta pull-right green-text">TRENDING</span>
                                <p className="title">
                                  <a href="">Lorem Impsum</a>
                                </p>
                              </div>
                            </td>
                            <td>
                              <p></p>
                            </td>
        									</tr>
        								</tbody>
        							</table>

      						</div>
      					</div>
      			</div>
      </div>
    );
  }
}
