newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);
authorHandle = Meteor.subscribeWithPagination('authorPosts', Session.get('currentPostAuthor'), 10);
tagHandle = Meteor.subscribeWithPagination('tagPosts', Session.get('currentPostTag'), 10);


Deps.autorun(function() {
  Meteor.subscribe('singlePost', Session.get('currentPostId'));
  
  Meteor.subscribe('comments', Session.get('currentPostId'));
})

Meteor.subscribe('notifications');