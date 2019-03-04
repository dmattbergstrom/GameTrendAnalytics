// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)
import { Meteor } from "meteor/meteor";

const Model = function(){

  var thisWeeksGameData = [];

  const dataObject = (pop, view, chan, upd)=>{
    return {
      popularity: pop,
      viewers: view,
      channels: chan,
      updated: upd
    };
  }

  this.setThisWeeksGameData = function(games){
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