import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

// CSS
import "./Navbar.css";

// Components
import AccountsUIWrapper from '../AccountsUIWrapper/AccountsUIWrapper.js';

export default class Navbar extends Component {

  constructor(props){
    super(props);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      redirect: false,
      redirectToGame: 0,
    };

    this.games = this.props.model.getGames();
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.games.filter(game =>
      game.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );
  
  handleSearch = (e) => {
    e.preventDefault();
    const {value} = this.state;
    let searchResult = this.props.model.searchGames(value); // The game._id is returned of the searched game. undefined is returned if the game wasn't found.
    if(!searchResult){
      searchResult = "";
    }
    window.location.href = "/gameinfo/"+searchResult;
  };

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

  render() {
    const { model, loading } = this.props;
    const { items } = model.getWatchlist();
    let watchlistItems = loading ? "&nbsp;&nbsp;Loading..." : items.map((item)=>{
      return <a key={item._id} className="dropdown-item" href={"/gameinfo/"+item._id}>{item.name}</a>;
    });

    /**
     *  Autosuggestion Setup:
     **/
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a popular game name',
      value,
      onChange: this.onChange
    };

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
          <form onSubmit={this.handleSearch} className="form-inline my-2 my-lg-0" >
            <div className="mr-sm-2">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
              />
            </div>
            <button className="button inverse-dark-green my-2 my-sm-0" type="submit" >Search</button>
          </form>
        </div>
      </nav>
    );
  }
}
