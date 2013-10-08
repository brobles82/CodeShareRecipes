Template.postEdit.helpers({
  post: function() {
    return Posts.findOne({slug: Session.get('currentPostSlug')});
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = Posts.findOne({slug: Session.get('currentPostSlug')})._id;

    var preview = $(e.target).find('[name=jsbinlink]').val();
    if(!preview.match(/^http:\/\/(?:.*?)\.?jsbin\.com\/.+$/)) {
      preview = "";
    }

    var tags = $(e.target).find('[name=tags]').val().split(',');

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      tags: $(e.target).find('[name=tag]').val(),
      message: $(e.target).find('[name=message]').val(),
      jsbinlink: preview,
      slug: URLify2($(e.target).find('[name=title]').val()),
      messageHeight: $('#wmd-input').css('height'),
      tags: tags
    }
    
    if (postProperties.tags.valueOf() == "") {
       throwError("You need tag your code");
       return;
    }

    // ensure the post has a title
    if (!postProperties.title) {
      throwError("Title can't be blank");
      return;
    }
    
    if (!postProperties.message) {
      throwError("Please fill in a message");
      return;
    }
    
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Session.set('isEditing', false);
        Session.set('currentPostSlug', postProperties.slug);
        Meteor.Router.to('postDetails', Session.get('currentPostSlug'));
      }
    });
  },
  
  'click .cancel': function(e) {
    e.preventDefault();
    
    Session.set('isEditing', false);
  }
});


Template.postEdit.rendered = function () {
  
  $("body, html").animate({
    scrollTop: 0
  }, 300);

  $('textarea#wmd-input').autoResize({
    minHeight: 100
  });

  $('#tags').tagsInput({});

  var converter = Markdown.getSanitizingConverter();

    Markdown.Extra.init(converter, {
                  extensions: "all",
                  highlighter: "prettify"
                });

    var editor = new Markdown.Editor(converter);
    editor.run();

};