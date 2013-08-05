App.AppLoginController = Ember.ObjectController.extend({
  
  submit: function () {

    // Get the todo title set by the "New Todo" text field
    var username = this.get('username');
      //if (!name.trim()) { return; }
      console.log(username);
      
    var email = this.get('email');
      //if (!email.trim()) { return; }
      console.log(useremail);

    // Create the new Todo model
    var user = App.User.createRecord({
      username: 'username',
      useremail: 'email'
    });

    // Clear the "New Todo" text field
    this.set('username', '');
    this.set('email', '');

    // Save the new model
    user.save();
    //this.transitionToRoute('recipes.recipe', recipe);
  }
});