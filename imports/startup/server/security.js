// Deny sketchy operations on the users collection.
Meteor.users.deny({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function () {
    return true;
  },
});
