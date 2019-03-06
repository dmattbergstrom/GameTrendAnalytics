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
<<<<<<< HEAD
    }
  });
=======
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

  // console.log(thisWeeksGameData);
>>>>>>> mattias
  
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

  // NOTE: For testing
  let thisWeeksGameData = [
     {
      _id: 1,
      name: "Apex Legends"
      data: [
        {
          popularity: 123123,
          viewers: 123,
          channels: 123,
          updated: new Date().toString(),
        },
      ]
      logo: "",
    }
  ];
  // -----------------------

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