App.Router.map(function() {

  this.resource('app', { path: '/' }, function () {
  
    this.route("about");
    this.route("login");
    this.route('features');
    this.route("signup");

    this.resource('recipes', { path: '/recipes' }, function() {
      this.route('recipe', { path: '/recipe/:recipe_id' });
      this.route('author', { path: '/author/:userName' });

      this.route('new', {path: '/recipe/new'});
    });

  });
});

Todos.Router.reopen({
  location: 'history'
});

// App.RecipesAuthorRoute = Ember.Route.extend({
//   model: function(params) {
//     return App.Recipe.find({userName : params.userName});
//   }

// });

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

App.RecipesIndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('recipe');
  }
});

App.RecipesNewRoute = App.AuthenticatedRoute.extend({
  model: function () {
    //return App.Recipe.create;
    return this.store.find('recipe');
  }
});

App.RecipesRecipeRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('recipe', params.recipe_id);
  }
});