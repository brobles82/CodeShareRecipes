Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return location.pathname === Meteor.Router[name + 'Path']();
    });
    
    return active && 'active';
  }
});

Template.header.rendered = function () {
  $('#login-dropdown-list .dropdown-toggle').text('Account');
  $('label#login-username-label').css( "color", "black" );
  $('label#login-password-label').css( "color", "black" );
  $('label#login-password-again-label').css( "color", "black" );
};