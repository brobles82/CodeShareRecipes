App.AppLoginController = Ember.Controller.extend({

  reset: function() {
    this.setProperties({
      username: "",
      password: "",
      newusername: "",
      newpassword: '',
      newemail: ''
    });
  },

  token: localStorage.token,
  
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),
  
  logout: function() {
    Meteor.logout();
      this.set('token', '');
      this.transitionToRoute('app.index');
  },

  login: function () {
    Meteor.loginWithPassword(this.get('username'), this.get('password'), function(err){
      if (err) {
        alert('User Dont Exist');
      } else {
        alert(Meteor.userId());
        //Here is the problem, I have to log 2 times for make it work
        App.set('token', Meteor.userId()); 
        //App.Router.router.handleURL('recipes.index');
      }
    });
    this.set('username', '');
    this.set('password', '');
    
    this.set('token', Meteor.userId());

    
  },
  
  signup: function () {

    var options = {};

    //Username validation
    options.username = this.get('newusername');
      if (!options.username.trim()) {
        errorText = 'Missing Username';
        return;
      }
    
    //Password validation
    options.password = this.get('newpassword');
      if (!options.password.trim()) {
        alert('Missing Password');
        return; 
      }
    
    options.email = this.get('newemail');
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(options.email)===false) {
        alert('Missing or invalid email');
        errorText = 'Missing Username';
        return; 
      }

    Accounts.createUser(options, function(err){
      if(err) {
        alert(err.reason);
      } else {
        Meteor.loginWithPassword(options.username, options.password, function(err){
          if (err) {
            alert('User Dont Exist');
          } else {
            App.set('newusername', '');
            App.set('newpassword', '');
            App.set('token', Meteor.userId());
            App.Router.router.handleURL('recipes.index');
          }
        });
      }
    });
  }
});
