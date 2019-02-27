import {Watchlist} from "../watchlist.js";

// Only publish watchlist-items that belong to the current user
Meteor.publish('watchlist', function watchlistPublication() {
  return Watchlist.find({owner:this.userId});
});
