App.Router.map(function() {

  this.resource('app', { path: '/' }, function () {
  
    this.route("about");
    this.route("login");
    this.route("signup");

    this.resource('recipes', { path: '/recipes' }, function() {
      this.route('recipe', { path: '/recipe/:recipe_id' });

      this.route('new', {path: '/recipe/new'});
    });

  });
});


App.ConfirmLogingRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.set('token', Meteor.user());
    controller.reset();
  }
});


App.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    if (!Meteor.user()) {
      alert('You must log in!');
      App.Router.router.handleURL('app.login');
    }
  }
});


App.AppIndexRoute = Ember.Route.extend({
  model: function () {
    return App.Recipe.find();
  }
});

App.RecipesIndexRoute = Ember.Route.extend({
  model: function () {
    return App.Recipe.find();
  }
});

App.RecipesNewRoute = App.AuthenticatedRoute.extend({
  model: function () {
    return App.Recipe.create;
  }
});

App.RecipesRecipeRoute = Ember.Route.extend({
  model: function(params) {
    return App.Recipe.find(params.recipe_id);
  }
});


App.AppAboutRoute = Ember.Route.extend({});


//User stuff
App.AppLoginRoute = App.ConfirmLogingRoute.extend({
  model: function () {
    return App.User.create;
  }
});