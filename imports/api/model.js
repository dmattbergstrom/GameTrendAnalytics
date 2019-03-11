// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)
import { Meteor } from "meteor/meteor";
import Games from "./collections/games/games";
import Watchlist from "./collections/watchlist/watchlist";

const Model = function(){

  var thisWeeksGameData = [];
  var watchlist = {items: []};
  var watchlistId = "";

  const isEmpty = (array) => {
    if (array === undefined || array.length == 0) {
      return true;
    } 
    return false;
  };

  const dataObject = (pop, view, chan, upd)=>{
    return {
      popularity: pop,
      viewers: view,
      channels: chan,
      updated: upd
    };
  }

  this.setGames = function(games){
    games.forEach((g) => {
      const { viewers, channels, game, _id, updated } = g;
      const { name, popularity, logo } = game;
      const dayTimeDiff = (new Date() - updated) / (1000 * 60 * 60 * 24);
      // If the data point is within the 7-day range:
      if (dayTimeDiff <= 7) {
        // Add to data if game exists in array already.
        if (thisWeeksGameData[_id]) {
          thisWeeksGameData[_id].data.push(dataObject(viewers, channels, popularity, updated));
        } else {
          // Otherwise create the game object.
          thisWeeksGameData[_id] = {
            name: name,
            data: [dataObject(viewers, channels, popularity, updated)],
            logo: logo.medium
          };
        }
      }
    });

    // Add derivative data to our stored games:
    for (const index in thisWeeksGameData) {
      const game = thisWeeksGameData[index];
      let avg_popularity = 0, avg_viewers = 0, avg_channels = 0;
      const { data } = game;
      const { length } = data;

      // Calculate averages & growth:
      let startPop = 0, endPop = 0, growthRate = 0;
      for(const i in data) {
        const dataset = data[i];
        if (i == 0) {
          startPop = dataset.popularity;
        } else if (i == length-1) {
          endPop = dataset.popularity;
          growthRate = endPop/startPop;
        }
        avg_popularity += dataset.popularity;
        avg_viewers += dataset.viewers;
        avg_channels += dataset.channels;
      }
      game.avg_popularity = parseInt(avg_popularity / length);
      game.avg_viewers = parseInt(avg_viewers / length);
      game.avg_channels = parseInt(avg_channels / length);

      // Calculate status:
      let status = "";
      const lowerLimit = 0.98;
      const upperLimit = 1.02;

      if (growthRate <= lowerLimit){
        status = "falling";
      } else if (growthRate < upperLimit) {
        status = "straight";
      } else if (upperLimit <= growthRate) {
        status = "trending";
      }
      game.growthRate = growthRate;
      game.status = status;

      thisWeeksGameData[index] = game;
    }

  }

  let testData = [
     {
      _id: 1,
      name: "Apex Legends",
      data: [  // This will always include 7 days data (of last week) 
        {  // Day 1
          popularity: 10,
          viewers: 123,
          channels: 123,
          dow: "Mon",   // dow: Represents "Day of week", as of which dow the data was collected
          updated: new Date().toString(),
        },
        {  // Day 2
          popularity: 20,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 3
          popularity: 30,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 4
          popularity: 40,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 5
          popularity: 50,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 6
          popularity: 60,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 7
          popularity: 70,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
      ],
      logo: "",
    },
    {
      _id: 2,
      name: "Fortnite",
      data: [
        {  // Day 1
          popularity: 0,
          viewers: 123,
          channels: 123,
          dow: "Mon",   // dow: Represents "Day of week", as of which dow the data was collected
          updated: new Date().toString(),
        },
        {  // Day 2
          popularity: 40,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 3
          popularity: 470,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 4
          popularity: 900,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 5
          popularity: 100,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 6
          popularity: 600,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 7
          popularity: 1000,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
      ],
      logo: "",
    },
  ];
  // -----------------------

  this.getGames = function() {
    return thisWeeksGameData;
  };

  this.getSpecificGame = (id) => {
    return thisWeeksGameData[id];
  };

  this.setWatchlist = (wl) => {
    if (!isEmpty(wl)) {
      watchlist = wl;
      watchlistId = wl._id;
    }
  };

  this.getWatchlist = () => {
    return watchlist;
  };

  this.removeFromWatchlist = (id) => {
    // Update Locally:
    const index = watchlist.items.indexOf(id);
    if (index > -1)
      watchlist.items.splice(index, 1);
      Meteor.call("Watchlist.upsert", watchlistId, watchlist); // Update DB.
  };

  this.addToWatchlist = (id) => {
    const empty = isEmpty(watchlist.items);
    // Update DB:
    if (empty) {
      // Create users watchlist & update locally:
      watchlist.items.push(id);  
      Meteor.call("Watchlist.insert", {items: items});
      return; // Done.
    }

    // Watchlist exists. Update Locally & then DB.
    const index = watchlist.items.indexOf(id);
    if (index <= -1)
      watchlist.items.push(id); // Only push if it does not already exist.
    if (!empty) {
      // Update users watchlist:
      Meteor.call("Watchlist.upsert", watchlistId, watchlist);
    }
  };

};
export const modelInstance = new Model();