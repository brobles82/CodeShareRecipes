Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var preview = $(e.target).find('[name=jsbinlink]').val();
    if(!preview.match(/^http:\/\/(?:.*?)\.?jsbin\.com\/.+$/)) {
      preview = "";
    }
    
    var tags = $(e.target).find('[name=tags]').val().split(',');
    
    var post = {
      title: $(e.target).find('[name=title]').val(),
      tag: $(e.target).find('[name=tag]').val(),
      message: $(e.target).find('[name=message]').val(),
      jsbinlink: preview,
      messageHeight: $('#wmd-input').css('height'),
      tags: tags
    }

    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        // if the error is that the post already exists, take us there
        if (error.error === 302)
          Meteor.Router.to('postDetails', error.details);
      } else {
        Meteor.Router.to('postDetails', Posts.findOne(id).slug);
      }
    });
  }
});

Template.postSubmit.rendered = function () {
  
  $('#tags').tagsInput({});

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