import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// const schema = new SimpleSchema({
//   name: String,
// }).validate({
//   name: 2,
// });

const Games = new Mongo.Collection('games');
export default Games;

// TODO: Add SimpleSchema
