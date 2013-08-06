Meteor.methods({
  'User.find': function (selector, options) {
    // perform checks

    // Be sure to call .fetch() to return the records
    return Meteor.users.find(selector, options).fetch();
  },

  // 'User.findOne': function (selector, options) {
  //   // perform checks

  //   return Meteor.users.findOne(selector, options);
  // },

  'User.insert': function (doc, options) {
    // perform checks

    return Meteor.users.insert(doc);
  },

  'User.update': function (selector, modifier, options) {
    // perform checks

    return Meteor.users.update(selector, modifier, options);
  },

  'User.remove': function (selector) {
    // perform checks

    return Meteor.users.remove(selector);
  }
});