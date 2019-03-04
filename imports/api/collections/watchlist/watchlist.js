import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const WatchlistCollection = new Mongo.Collection('watchlist');
export default WatchlistCollection;
// TODO: Add SimpleSchema
