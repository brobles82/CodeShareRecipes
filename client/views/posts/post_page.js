Template.postPage.rendered = function () {
  $('#share').sharrre({
    share: {
      googlePlus: true,
      twitter: true
    },
    buttons: {
      googlePlus: {size: 'tall', annotation:'bubble'},
      twitter: {count: 'vertical', via: '_JulienH'}
    },
    hover: function(api, options){
      $(api.element).find('.buttons').show();
    },
    hide: function(api, options){
      $(api.element).find('.buttons').hide();
    },
    enableTracking: true
  });
};

Template.postPage.helpers({
  currentPost: function() {
    return post;
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
  'click #delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      Posts.remove(post._id);
      Router.go('bestPosts');
    }
  },

  "click .edit": function (e) {
    e.preventDefault();
    reactiveVariable.setState(0);
  }
});
