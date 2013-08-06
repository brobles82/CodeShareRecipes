App.Router.map(function() {

  this.resource('app', { path: '/' }, function () {
  
    this.route("about");
    this.route("login");

    this.resource('recipes', { path: '/recipes' }, function() {
      this.route('recipe', { path: '/recipe/:recipe_id' });

      this.route('new', {path: '/recipe/new'});
    });

  });
});


App.AppIndexRoute = Ember.Route.extend({
  model: function () {
    //return App.Recipe.find({}, {sort: {date: -1}, limit: 5});
    return App.Recipe.find();
  }
});

App.RecipesIndexRoute = Ember.Route.extend({
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

//User stuff

App.AppLoginRoute = Ember.Route.extend({
  model: function () {
    return App.User.create;
  }
});


