import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Games from "./games.js";

Meteor.methods({
  /**
  *  Inserts a document "doc" in to the "games" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
  "Games.insert": function(doc) {
    Games.insert(
      doc,
      (error, res_id) => {
        if ( err ) {
          console.log ( "ERROR in INSERT: " + err ); //info about what went wrong
          return; // Stop exec
        }
      }
    );
  },

  /**
  *  Updates an object in the "games" collection.
  *
  *  @param id is the id of the JSON object that is to be updated.
  *  @param doc is a JSON object with the parameters that wish to be updated.
  **/
  "Games.upsert": ( id, doc ) => {
     Games.upsert({_id: id}, {$set:doc},
      (err, objId) => { // Handle errors
        if(err) {
          console.log("ERROR in UPSERT: " + err + " with object " + objId);
        }
      }
     );
   }
});
