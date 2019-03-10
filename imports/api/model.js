// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)
import { Meteor } from "meteor/meteor";
import Games from "./collections/games/games";
import Watchlistcollection from "./collections/watchlist/watchlist";

const Model = function(){

  var thisWeeksGameData = [];
  var watchlist = [];

  const waitForDataLoad = (colname, findDoc = {}) => {
    // choose the global context based on the environment
    const root = Meteor.isClient ? window : global;
    // find the instance in the global context - e.g. window['Games']
    const collection = root[colname];

    const subscription = Meteor.subscribe(colname.toLowerCase()).ready();

    console.log(window["WatchlistCollection"]);

    Meteor.setTimeout(() => {
      if (subscription){
        console.log(collection);
        return collection.find(findDoc).fetch();
      } else {
        waitForDataLoad(colname, findDoc);
      }
    }, 1000);

    return 1;

  }

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
  let watchlistItems = [1,2];  // An array that contains the _id's of the games in a users watchlist
  console.log(watchlistItems); // NOTE: For testing

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

  this.getAllGames = function() {
    return thisWeeksGameData;
  };

  this.getSpecificGame = (name) => {
    return thisWeeksGameData[name];
  };

  this.getWatchlist = () => {
    waitForDataLoad("Watchlistcollection", {});
  };

  console.log(this.getWatchlist());

  this.removeFromWatchlist = (name) => {
    delete watchlist[watchlist.indexOf("name")];
  };

  this.addToWatchlist = (name) => {
    watchlist.push("name");
  };

  // Davids:
  // this.addToWatchlist = (id) => {
  //   // TODO: To be filled... [Push to watchlist-array declared on row 33]
  //   watchlistItems.push(id);
  //   console.log(watchlistItems); // NOTE: For testing
  // };

  // this.removeFromWatchlist = (id) => {
  //   // TODO: To be filled... [Remove from watchlist-array declared on row 33]
  //   var index = watchlistItems.indexOf(id);
  //   if (index > -1) {
  //     watchlistItems.splice(index, 1);
  //   }
  //   console.log(watchlistItems); // NOTE: For testing
  // };
};

export const modelInstance = new Model();