Template.login.events({
  'click #login-form' : function(e, tmp) {
    e.preventDefault();
    
    console.log(tmp.find('.loginUsername').value.trim());
    
    if (!tmp.find('.loginUsername').value.trim())
      return;
    
    if (!tmp.find('.loginPassword').value.trim())
      return;
    
    Meteor.loginWithPassword(tmp.find('.loginUsername').value, tmp.find('.loginPassword').value, function(err){
      if (err) {
        alert('User Dont Exist');
      } else {
       console.log('worked');
      }
    });
    
  },
  
  'click #signup-form' : function (e,tmp) {
    e.preventDefault();
    
    var options = {};

    //Username validation
    options.username = tmp.find('.signup-username').value;
      if (!options.username.trim()) {
        //errorText = 'Missing Username';
        return;
      }
    
    //Password validation
    options.password = tmp.find('.signup-password').value;
      if (!options.password.trim()) {
        //alert('Missing Password');
        return; 
      }
    
    //email validation
    options.email = tmp.find('.signup-email').value;
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(options.email)===false) {
        //alert('Missing or invalid email');
        //errorText = 'Missing Username';
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
           /* self.set('newusername', '');
            self.set('newemail', '');
            self.set('newpassword', '');
            self.set('token', Meteor.userId());
            App.Router.router.handleURL('recipes.index');*/
          }
        });
      }
    });
    
  }
  

});