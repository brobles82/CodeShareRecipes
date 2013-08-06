App.AppLoginController = Ember.ObjectController.extend({

  login: function () {
    Meteor.loginWithPassword(this.get('username'), this.get('password'));

    if(Meteor.userId()) {
      
      this.set('username', '');
      this.set('password', '');
      this.set('email', '');
      this.transitionToRoute('recipes');
      
      if(Meteor.userId())
        alert(Meteor.userId());

    } else {
      alert('User Dont Exist');
    }

  },

  signup: function () {

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