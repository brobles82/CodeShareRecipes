Template.postEdit.helpers({
  post: function() {
    return post;
  },
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = post._id;

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

    Posts.update(currentPostId, {$set: postProperties}, function(error, data) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        creditPurchase.setState(1);

        //Update search        
        Spomet.update(new Spomet.Findable(postProperties.title, 'title', currentPostId, 'post', new Date().getTime()));
        Spomet.update(new Spomet.Findable(postProperties.message, 'message', currentPostId, 'post', new Date().getTime()));
        Router.go('/coderecipe/'+ postProperties.slug);
      }
    });
  },

  'click .cancel': function(e) {
    e.preventDefault();
    creditPurchase.setState(1);
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
