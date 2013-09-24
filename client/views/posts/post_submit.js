Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = {
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    }
    
    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        // if the error is that the post already exists, take us there
        if (error.error === 302)
          Meteor.Router.to('postDetails', error.details)
      } else {
        Meteor.Router.to('postDetails', id);
      }
    });
  }
});

Template.postSubmit.rendered = function () {
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