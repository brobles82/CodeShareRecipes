Template.postEdit.helpers({
  post: function() {
    return Posts.findOne(Session.get('currentPostId'));
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentPostId = Session.get('currentPostId');
    
    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val(),
    }

    console.log(postProperties);
    
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Session.set('isEditing', false);
      }
    });
  },
  
  'click .cancel': function(e) {
    e.preventDefault();
    
    Session.set('isEditing', false);
  }
});


Template.postEdit.rendered = function () {
  $('textarea#wmd-input').autoResize({
    minHeight: 100
  });


  var converter = Markdown.getSanitizingConverter();

    Markdown.Extra.init(converter, {
                  extensions: "all",
                  highlighter: "prettify"
                });

    var editor = new Markdown.Editor(converter);
    editor.run();

};