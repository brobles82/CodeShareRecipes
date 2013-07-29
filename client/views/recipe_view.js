App.RecipeView = Ember.View.extend({
  didInsertElement: function() {
    window.scrollTo(0, 0);
    prettyPrint();
  }
});