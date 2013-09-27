Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/features': 'features',
  
  '/coderecipe/last': {
    to: 'newPosts',
    and: function() { 
      Session.set('currentPostAuthor', null);
      Session.set('isEditing', false);
    }
  },
  
  '/coderecipe/top': {
    to: 'bestPosts',
    and: function() { 
      Session.set('currentPostAuthor', null);
      Session.set('isEditing', false);
    }
  },
  
  '/coderecipe/author/:author': {
    to: 'postAuthor',
    and: function(author) { 
      Session.set('currentPostAuthor', author);
      Session.set('isEditing', false);
    }
  },


  '/coderecipe/:_id': {
    to: 'postDetails',
    and: function(id) { 
      Session.set('currentPostId', id);
      Session.set('isEditing', false);
    }
  },
  
  '/coderecipe/:_id/edit': {
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
