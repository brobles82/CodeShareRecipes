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


Template.header.events = {
  "click a": function () {
    $("body, html").animate({
      scrollTop: 0
    }, 300);
  }
};