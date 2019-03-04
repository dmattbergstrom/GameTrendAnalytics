// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)

import { Meteor } from "meteor/meteor";

const Model = function(){

  var thisWeeksGameData = [];
  var watchlist = [];

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
        if (thisWeeksGameData[name]) {
          thisWeeksGameData[name].data.push(dataObject(viewers, channels, popularity, updated));
        } else {
          // Otherwise create the game object.
          thisWeeksGameData[name] = {
            _id: _id,
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
      data.forEach(dataset => {
        avg_popularity += dataset.popularity;
        avg_viewers += dataset.viewers;
        avg_channels += dataset.channels;
      });
      game.avg_popularity = parseInt(avg_popularity / length);
      game.avg_viewers = parseInt(avg_viewers / length);
      game.avg_channels = parseInt(avg_channels / length);

      thisWeeksGameData[index] = game;
    }

  }

  // console.log(thisWeeksGameData);
  
  // thisWeeksGameData = [
  //    name: {
  //     _id: 
  //     data: [
  //       {
  //         popularity:
  //         viewers:
  //         channels:
  //         updated:
  //       },
  //       ...
  //       ...
  //       ...
  //       {
  //         popularity:
  //         viewers:
  //         channels:
  //         updated:
  //       }
  //     ]
  //     logo:
  //   }
  // ];

  this.getAllGames = function() {
    return thisWeeksGameData;
  };

  this.getSpecificGame = (name) => {
    return thisWeeksGameData[name];
  };

  this.setWatchlist = (wl) => {
    watchlist = wl;
  };

  this.getWatchlist = () => {
    return watchlist;
  };

  this.removeFromWatchlist = (name) => {
    delete watchlist[watchlist.indexOf("name")];
  };

  this.addToWatchlist = (name) => {
    watchlist.push("name");
  };
};

export const modelInstance = new Model();