// Model:n vi använder för att lagra, hämta och hantera vår data.
import { Meteor } from "meteor/meteor";
import Games from "./collections/games/games";
import Watchlist from "./collections/watchlist/watchlist";

const Model = function(){

  var games = [];
  var watchlist = {items: []};
  var watchlistId = "";

  var topGames = [] // Contains top games

  //FOR TESTING 
    topGames = [
      {name: "Game1", data: [1,2,3,4,5,6,7], viewers: 44},  // Viewers ska ersättas med avg_popularity/avg_viewers
      {name: "Game2", data: [8,22,33,44,55,66,77], viewers: 55},
      {name: "Game3", data: [11,11,13,13,14,14,12], viewers: 10},
      {name: "Game4", data: [12,17,13,14,15,16,14], viewers: 42},
      {name: "Game5", data: [13,63,11,66,15,19,57], viewers: 99},
      /*{name: "Game6", data: [14,41,22,55,16,5,27], viewers: 10},
      {name: "Game7", data: [15,12,44,44,17,23,77], viewers: 20},
      {name: "Game8", data: [16,42,33,12,18,44,1], viewers: 50},
      {name: "Game9", data: [17,22,66,20,19,100,7], viewers: 14},
      {name: "Game10", data: [11,12,63,1,55,8,10], viewers: 90},*/
    ];
  //------

  /**
   *  isEmpty(): Checks if an array is empty.
   * 
   *  @param {Array} array is the array we wish to check.
   *  @returns true / false
   */
  const isEmpty = (array) => {
    if (array === undefined || array.length == 0) {
      return true;
    } 
    return  false;
  };

  /**
   *  containsId(): Checks if an array with JSON objects contains an item with a specific ID.
   * 
   *  @param {String} id is the ID we're after.
   *  @param {Array} items is the array of JSON items we wish to search through. 
   *  @returns true / false
   */
  const containsId = (id, items) => {
    let found = false;
    let i = null
    items.forEach((item, index) => {
      if (item._id == id)
        found = true;
        i = index;
    });
    return {found: found, index: i};
  }

  /**
   *  dataObject(): Builds a JSON object with inputted game info.
   * 
   *  @param {Integer} pop is the current popularity of the game.
   *  @param {Integer} view is the current # of viewers for this game.
   *  @param {Integer} chan is the current # of live Twitch channels for this game.
   *  @param {Date} upd is the date which this data has been fetched.
   * 
   *  @returns The constructed JSON object.
   */
  const dataObject = (pop, view, chan, upd)=>{
    return {
      popularity: pop,
      viewers: view,
      channels: chan,
      updated: upd
    };
  }

  /**
   *  setGames(): Cleans and adds data, fetched from our Games collection. Sets the models "games" var.
   *
   *  @param {Array} gms is all of the game JSON objects returned from our Games collection.
   *  @returns void
   */
  this.setGames = function(gms){
    // Clean up the data for easier usage in components.
    gms.forEach((g) => {
      // NOTE: The _id is from our own collection, not to be confused with the _id from the API.
      const { viewers, channels, game, updated } = g;
      const { name, popularity, box, _id, logo } = game;
      const dayTimeDiff = (new Date() - updated) / (1000 * 60 * 60 * 24);
      // If the data point is within the 7-day range:
      if (dayTimeDiff <= 7) {
        // Add to data if game exists in array already.
        if (games[_id]) {
          games[_id].data.push(dataObject(viewers, channels, popularity, updated));
        } else {
          // Otherwise create the game object.
          games[_id] = {
            _id: _id,
            name: name,
            data: [dataObject(viewers, channels, popularity, updated)],
            img: box.medium,
            logo: box.small
          };
        }
      }
    });

    // Add derivative data to our stored games: (Again, for easier usage in components)
    for (const index in games) {
      const game = games[index];
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
      const lowerLimit = 0.98; // TODO
      const upperLimit = 1.02; // TODO

      if (growthRate <= lowerLimit){
        status = "falling";
      } else if (growthRate < upperLimit) {
        status = "straight";
      } else if (upperLimit <= growthRate) {
        status = "trending";
      }
      game.growthRate = growthRate;
      game.status = status;

      // Finally, update the game with all the clean and derivative data:
      games[index] = game;
    }

  }

  /**
  *  Get:ers for games:
  **/
  this.getGames = function() {
    return games;
  };

  this.getTopGames = () => {
    return topGames;
  };

  this.setTopGames = () => {

  };

  this.getSpecificGame = (id) => {  
    return games[id];
  };

  /**
  *  Get:er & Set:er for Watchlist:
  **/
  this.getWatchlist = () => {
    return watchlist;
  };

  this.setWatchlist = (wl) => {
    if (!isEmpty(wl)) {
      watchlist = wl;
      watchlistId = wl._id;
    }
  };

  /**
   *  removeFromWatchlist(): Removes an item from the users Watchlist.
   * 
   *  @param {String} id is the ID of the item to be removed.
   *  @returns void
   **/
  this.removeFromWatchlist = (id) => {
    // Update Locally:
    const {found, index} = containsId(id, watchlist.items);
    if (found)
      watchlist.items.splice(index, 1);
      console.log(index);
      Meteor.call("Watchlist.upsert", watchlistId, watchlist); // Update DB.
  };

  /**
  *  addToWatchlist(): Add an item to the users Watchlist. 
  *
  *  @param {String} id is the ID of the item to be added.
  *  @param {String} name is the Name of the item to be added.
  *  @returns void
  **/
  this.addToWatchlist = (id, name) => {
    const empty = isEmpty(watchlist.items);  
    console.log(id+" "+name);
    console.log(watchlist._id);
      
    // Update DB:
    if (empty && !watchlist._id) {
      console.log("test");
      
      // Create users watchlist & update locally:
      watchlist.items.push({ _id: id, name: name });  
      Meteor.call("Watchlist.insert", {items: watchlist.items});
      return; // Done.
    }

    // Watchlist exists. Update Locally & then DB.
    const {found} = containsId(id, watchlist.items);
    if (!found)
      watchlist.items.push({ _id: id, name: name}); // Only push if it does not already exist.
    if (!empty) {
      // Update users watchlist:
      Meteor.call("Watchlist.upsert", watchlistId, watchlist);
    }
  };

};
export const modelInstance = new Model();