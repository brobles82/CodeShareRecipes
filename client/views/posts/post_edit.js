Template.postEdit.helpers({
  post: function() {
    return post;
  },
});

Template.postEdit.events({
  'click .send': function(e) {
    e.preventDefault();

    var currentPostId = post._id;

    var preview = $('#jsbinlink').val();
    if(!preview.match(/^http:\/\/(?:.*?)\.?jsbin\.com\/.+$/)) {
      preview = "";
    }

    var tags = $('#tags').val().split(',');

    var postProperties = {
      title: $('#title').val(),
      tags: tags,
      message: $('.message').val(),
      jsbinlink: preview,
      slug: URLify2($('#title').val()),
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

    Posts.update(currentPostId, {$set: postProperties}, function(error, data) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        reactiveVariable.setState(1);
        Router.go('newPosts');
      }
    });
  },

  'click .cancel': function(e) {
    e.preventDefault();
    reactiveVariable.setState(1);
  }
});


Template.postEdit.rendered = function () {

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
