// TodosModel - Todos makes a better name, but it's taken
// TODO move this to the server
// TODO change name to Todos
ModelRecipes = new Meteor.Collection('recipes');

Meteor.methods({
  'Recipe.find': function (selector, options) {
    // perform checks

    // Be sure to call .fetch() to return the records
    return ModelRecipes.find(selector, options).fetch();
  },

  'Recipe.findOne': function (selector, options) {
    // perform checks

    return ModelRecipes.findOne(selector, options);
  },

  'Recipe.insert': function (doc, options) {
    // perform checks

    return ModelRecipes.insert(doc);
  },

  'Recipe.update': function (selector, modifier, options) {
    // perform checks

    return ModelRecipes.update(selector, modifier, options);
  },

  'Recipe.remove': function (selector) {
    // perform checks

    return ModelRecipes.remove(selector);
  }
});

if (Meteor.isServer) {
  
}
