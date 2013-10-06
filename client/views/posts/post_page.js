Template.postPage.helpers({
  currentPost: function() {
    return Posts.findOne({slug: Session.get('currentPostSlug')});
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
  },


  formatBody: function(value) {
  
    var safeConverter = Markdown.getSanitizingConverter();
    
    Markdown.Extra.init(safeConverter, {
                  extensions: "all",
                  highlighter: "prettify"
                });
                
    return safeConverter.makeHtml(value);
  }
});

Template.postPage.events({
	'click .delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      Posts.remove(Session.get('currentPostId'));
      Meteor.Router.to('bestPosts');
    }
  },

 	"click .edit": function (e) {
 		e.preventDefault();
 		Session.set('isEditing', true);
 	}
  
});

Template.postPage.rendered = function () {
  $("body, html").animate({
    scrollTop: 0
  }, 300);
};

