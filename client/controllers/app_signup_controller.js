App.AppSignupController = Ember.ObjectController.extend({
  
  submit: function () {

    var options = {};

    // Get the todo title set by the "New Todo" text field
    options.username = this.get('username');
      //if (!name.trim()) { return; }
     

    options.password = this.get('password');
      //if (!name.trim()) { return; }
    
    options.email = this.get('email');
      //if (!email.trim()) { return; }
     

    Accounts.createUser(options);

    Meteor.loginWithPassword(options.username, options.email);

    this.set('username', '');
    this.set('password', '');
    this.set('email', '');

    // Save the new model
    //console.log(user.save());
    this.transitionToRoute('recipes');
  }
});