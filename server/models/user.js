ModelUsers = new Meteor.Collection('users');

Meteor.methods({
  'User.find': function (selector, options) {
    // perform checks

    // Be sure to call .fetch() to return the records
    return ModelUsers.find(selector, options).fetch();
  },

  'User.findOne': function (selector, options) {
    // perform checks

    return ModelUsers.findOne(selector, options);
  },

  'User.insert': function (doc, options) {
    // perform checks

    return ModelUsers.insert(doc);
  },

  'User.update': function (selector, modifier, options) {
    // perform checks

    return ModelUsers.update(selector, modifier, options);
  },

  'User.remove': function (selector) {
    // perform checks

    return ModelUsers.remove(selector);
  }
});

if (Meteor.isServer) {
  
}