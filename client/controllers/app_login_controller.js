App.AppLoginController = Ember.ObjectController.extend({
  
  submit: function () {

    // Get the todo title set by the "New Todo" text field
    var username = this.get('username');
      //if (!name.trim()) { return; }
      console.log(username);
      
    var useremail = this.get('useremail');
      //if (!email.trim()) { return; }
      console.log(useremail);

    // Create the new Todo model
    var user = App.User.createRecord({
      username: 'username',
      useremail: 'useremail'
    });

    // Clear the "New Todo" text field
    this.set('username', '');
    this.set('useremail', '');

    // Save the new model
    user.save();
    //this.transitionToRoute('recipes.recipe', recipe);
  }
});