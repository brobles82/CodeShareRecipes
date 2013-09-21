Template.postPage.helpers({
  currentPost: function() {
    return Posts.findOne(Session.get('currentPostId'));
  },

  ownPost: function() {
    return this.userId == Meteor.userId();
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },

  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.postPage.events({
	'click .delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      Posts.remove(Session.get('currentPostId'));
      Meteor.Router.to('bestPosts');
    }
  }
});