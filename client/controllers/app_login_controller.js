App.AppLoginController = Ember.ObjectController.extend({

  submit: function () {
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

  }
  
});