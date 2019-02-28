import Games from "../games.js";
// Publish all game data to all clients.
Meteor.publish('games', function gamesPublication() {
  return Games.find({});
});
