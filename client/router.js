App.Router.map(function() {

  this.resource('app', { path: '/' }, function () {
  
    this.route("about");

    this.resource('recipes', { path: '/recipes' }, function() {
      this.route('recipe', { path: '/recipe/:recipe_id' });

      this.route('new', {path: '/recipe/new'});
    });

    //this.resource('recipe', { path: '/recipes/recipe/:recipe_id' });

  });


});

App.RecipesRoute = Ember.Route.extend({
  model: function () {
    return App.Recipe.find();
  }
});

App.RecipesNewRoute = Ember.Route.extend({
  model: function () {
    return App.Recipe.create;
  }
});

App.RecipesRecipeRoute = Ember.Route.extend({
  model: function(params) {
    return App.Recipe.find(params.recipe_id);
  }
});
