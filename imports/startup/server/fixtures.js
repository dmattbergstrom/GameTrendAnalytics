import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

// Load in collections:
import  "../../api/api.js";
import Games from "../../api/collections/games/games.js"

const CLIENT_ID = '1p1vbzyuiq4miuyp06p3bbduvj4t4o';

Meteor.methods({
  "getTopGames":(limit)=>{
    try {
      const result = HTTP.get('https://api.twitch.tv/kraken/games/top', {
        params: { limit: limit },
        headers: { 'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': CLIENT_ID }
      }, function(e, res) {
        // Insert to database if there was no error:
        if (!e) {
          let games = JSON.parse(res.content).top;
          games.map((game)=>{
            // TODO: Maybe clean data a little bit?
            game.updated = new Date();
            Games.insert(game);
          });
        } else {
          console.log("API-GET ERROR", e);
        }
      });
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      console.log("API-GET ERROR", e);
    }
  }
});

// API Helper methods
const processResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response;
}

const handleError = (error) => {
  if (error.json) {
    error.json().then(error => {
      console.error('getAllDishes() API Error:', error.message || error);
    })
  } else {
    console.error('getAllDishes() API Error:', error.message || error);
  }
};

// Init API calls every 12h. Make initial API call too, if its been over 12h.
Meteor.startup(function(){

    // Check last inserted objects date to determine whether we need an initial API call.
    const lastInsertedObj = Games.find({}, {sort: { _id: -1 }}, { limit: 1}).fetch().pop();
    if (lastInsertedObj || lastInsertedObj != undefined) {
      const hourTimeDiff = (new Date() - new Date(lastInsertedObj.updated)) / (1000 * 60 * 60);
      if (hourTimeDiff > 12) {
        Meteor.call("getTopGames",100);
      }
    } else {
      // DB was empty. Make initial API call.
      Meteor.call("getTopGames",100);
    }

    // Set a timer to keep updating the DB.
    const msToTwelveH = 1000*60*60*12;
    Meteor.setInterval(function(){
      Meteor.call("getTopGames",100);
    }, msToTwelveH);
});
