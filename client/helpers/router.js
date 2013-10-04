Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/features': 'features',
  
  '/coderecipe/last': {
    to: 'newPosts',
    and: function() { 
      
    }
  },
  
  '/coderecipe/top': {
    to: 'bestPosts',
    and: function() { 
      
    }
  },
  
  '/coderecipe/author/:author': {
    to: 'postAuthor',
    and: function(author) { 
      Session.set('currentPostAuthor', author);
    }
  },
  
  
  ///////////////////////////////////
  
  
  '/coderecipe/tag/:tag': {
    to: 'postTag',
    and: function(tag) { 
      Session.set('currentPostTag', tag);
    }
  },
  
  
  //////////////////////////////////


  '/coderecipe/:_id': {
    to: 'postDetails',
    and: function(id) { 
      Session.set('currentPostId', id);
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
  },
  
  'clearEdit' : function(page) {
      Session.set('isEditing', null);
      return page;
  },
  
  'clearAuthor' : function(page) {
      Session.set('currentPostAuthor', null);
      return page;
  },
  'clearTag' : function(page) {
      Session.set('currentPostTag', null);
      return page;
  }
});

Meteor.Router.filter('requireLogin', {only: 'postSubmit'});
Meteor.Router.filter('clearEdit', {except: 'postEdit'});
Meteor.Router.filter('clearAuthor', {except: 'postAuthor'});
Meteor.Router.filter('clearTag', {except: 'postTag'});
Meteor.Router.filter('clearErrors');
