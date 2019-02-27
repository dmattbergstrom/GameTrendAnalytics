import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  /**
  *  Inserts a document "doc" in to the "watchlist" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
  "Watchlist.insert": function(doc) {
    Watchlist.insert(
      doc,
      (error, res_id) => {
        if ( err ) {
          console.log ( "ERROR in INSERT: " + err ); //info about what went wrong
          alert("Something went wrong.");
          return; // Stop exec
        }
      }
    );
  },

  /**
  *  Updates an object in the "watchlist" collection.
  *
  *  @param id is the id of the JSON object that is to be updated.
  *  @param doc is a JSON object with the parameters that wish to be updated.
  **/
  "Watchlist.upsert": ( id, doc ) => {
     Watchlist.upsert({_id: id}, {$set:doc},
      (err, objId) => { // Handle errors
        if(err) {
          console.log("ERROR in UPSERT: " + err + " with object " + objId);
          alert("Something went wrong.");
        }
      }
     );
   }
});
