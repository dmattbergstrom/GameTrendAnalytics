import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// CSS
import "./Navbar.css";

// Components
import AccountsUIWrapper from '../AccountsUIWrapper/AccountsUIWrapper.js';

export default class Navbar extends Component {

  constructor(props){
    super(props);

    this.state = {
      search_value: '',
      redirect: false,
      redirectToGame: 0,
      searchGame: "1111",
    };
  }
  
  handleSearch = (e) => {
    let searchResult = this.props.model.searchGames(e.target.value); // The game._id is returned of the searched game. undefined is returned if the game wasn't found.
    if(!searchResult){
      searchResult = "1111";
    }
    this.setState({
      search_value: e.target.value,
      searchGame: searchResult,
    });
  };

  render() {
    const { model, loading } = this.props;
    const { items } = model.getWatchlist();
    let watchlistItems = loading ? "&nbsp;&nbsp;Loading..." : items.map((item)=>{
      return <a key={item._id} className="dropdown-item" href={"/gameinfo/"+item._id}>{item.name}</a>;
    });

    return (
      <nav className="navbar navbar-expand-lg navbar-dark dark-grey container-fluid">

        <a className="navbar-brand" href="/">Twitch Trend Analytics</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Overview <span className="sr-only">(current)</span></a>
            </li>
            { this.props.currentUser ?
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Watchlist
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/watchlist">Show All</a>
                  <div className="dropdown-divider"></div>
                  {watchlistItems}
                </div>
              </li> : ''
            }
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="dark-green-text"><AccountsUIWrapper /></span>
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" >
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearch} />          
            <Link to={"/gameinfo/"+this.state.searchGame} ><button className="button inverse-dark-green my-2 my-sm-0" type="submit" >Search</button></Link>
          </form>
        </div>
      </nav>
    );
  }
}
