App.AppLoginController = Ember.ObjectController.extend({
  
  submit: function () {

    var options = {};

    // Get the todo title set by the "New Todo" text field
    options.username = this.get('username');
      //if (!name.trim()) { return; }
      console.log(username);

    options.password = this.get('password');
      //if (!name.trim()) { return; }
      console.log(username);
      
    options.email = this.get('email');
      //if (!email.trim()) { return; }
      console.log(email);

    Accounts.createUser(options);

    // // Create the new Todo model
    // var user = App.User.createRecord({
    //   username: username,
    //   password: password,
    //   email: email
    // });

    // this.set('username', '');
    // this.set('email', '');

    // Save the new model
    //console.log(user.save());
    this.transitionToRoute('recipes');
  }
});