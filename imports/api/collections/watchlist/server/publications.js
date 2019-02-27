import {Watchlist} from "../watchlist.js";

// This code only runs on the server
// Only publish tasks that are public or belong to the current user
Meteor.publish('watchlist', function watchlistPublication() {
  return Watchlist.find({owner:this.userId});
});
