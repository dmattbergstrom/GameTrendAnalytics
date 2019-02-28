import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Watchlist = new Mongo.Collection('watchlist');
export default Watchlist;
// TODO: Add SimpleSchema
