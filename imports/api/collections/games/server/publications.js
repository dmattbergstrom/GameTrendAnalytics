import {Games} from "../games.js";

// This code only runs on the server
// Only publish tasks that are public or belong to the current user
Meteor.publish('games', function gamesPublication() {
  return Games.find({});
});
