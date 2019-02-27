import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

// Load in collections:
import  "../../api/api.js";

// TODO: GET COLLECTION REFERENCED!
import {Games} from "../../api/collections/games/games.js"

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

// Init API calls every 24h. Make initial API call too.
Meteor.startup(function(){
    const msToDay = 1000*60*60*24;
    // Meteor.call("getTopGames",10); TODO: UNCOMMENT TO TEST!
    Meteor.setInterval(function(){

    }, msToDay);
});
