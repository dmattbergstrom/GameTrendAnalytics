import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Watchlistcollection = new Mongo.Collection('watchlistcollection');
export default Watchlistcollection;
// TODO: Add SimpleSchema
