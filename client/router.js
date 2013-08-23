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

App.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    if (!this.controllerFor('appLogin').get('token')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    alert('You must log in!');

    var loginController = this.controllerFor('appLogin');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('app.login');
  }
});

App.AppLogingRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.reset();
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