import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import "./Watchlist.css"

export default class Watchlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Watchlist container-fluid">

      			<div className="col-sm-10 offset-sm-1 dark">


      						<div className="pull-right">

      							<div className="table-filter-buttons">
      								<button type="button" className="button inverse-dark-green hoverable btn-filter" data-target="trending">Trending</button>
      								<button type="button" className="button inverse-dark-blue hoverable btn-filter" data-target="straight">Straight</button>
      								<button type="button" className="button inverse-dark-red hoverable btn-filter" data-target="falling">Falling</button>
      								<button type="button" className="button inverse-super-dark hoverable btn-filter active-button" data-target="all">All</button>
      						   </div>

        						<div className="table-container">
        							<table className="table table-filter">
        								<tbody>
        									<tr data-status="trending">
        										<td>
        											<div className="form-check">
        												<input type="checkbox" id="checkbox1"/>
        												<label for="checkbox1"></label>
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
                                  {/*<span className="pull-right trending"> (trending)</span>*/}
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
