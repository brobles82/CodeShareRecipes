Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/features': 'features',
  '/best': 'bestPosts',
  '/new': 'newPosts',
  
  '/posts/:_id': {
    to: 'postDetails',
    and: function(id) { 
      Session.set('currentPostId', id);
      Session.set('isEditing', false);
    }
  },
  
  '/posts/:_id/edit': {
    to: 'postEdit', 
    and: function(id) { Session.set('currentPostId', id); }    
  },
  
  '/submit': 'postSubmit'
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    clearErrors();
    return page;
  }
});

Meteor.Router.filter('requireLogin', {only: 'postSubmit'});
Meteor.Router.filter('clearErrors');
