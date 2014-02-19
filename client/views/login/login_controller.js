Template.login.events({
  'click #login-form' : function(e, tmp) {
    e.preventDefault();
    
    console.log(tmp.find('.loginUsername').value.trim());
    
    if (!tmp.find('.loginUsername').value.trim()) {
      return throwError('Please input username');
    }
    if (!tmp.find('.loginPassword').value.trim()) {
      return throwError('Please input the password');
    }
    
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
        return throwError('Missing Username');
      }
    
    //Password validation
    options.password = tmp.find('.signup-password').value;
      if (!options.password.trim()) {
        return throwError('Missing Password');
      }
    
    //email validation
    options.email = tmp.find('.signup-email').value;
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(options.email)===false) {
        return throwError('Missing or invalid email');
      }
    
    Accounts.createUser(options, function(err){
      if(err) {
        return throwError(err.reason);
      } else {
        Meteor.loginWithPassword(options.username, options.password, function(err){
          if (err)
            alert('User Dont Exist');
        });
      }
    });
  }
});