Meteor.publish('search', function() {
  return Posts.find({}, {sort: {submitted: -1}});
});

Meteor.publish('newPosts', function(limit) {
  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('authorPosts', function(author,limit) {
  return Posts.find({author:author}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('tagPosts', function(tag,limit) {
  return Posts.find({tags:tag}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('singePost', function(slug) {
  return Posts.find({slug: slug});
});

Meteor.publish('comments', function(slug) {
  a = Posts.findOne({slug: slug});
  return Comments.find({postId: a._id});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});
