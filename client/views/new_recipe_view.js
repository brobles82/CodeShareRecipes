App.NewRecipeView = Ember.TextArea.extend({
  classNames: ['wmd-input'],

  didInsertElement: function () {
      
    var converter = Markdown.getSanitizingConverter();
    
    Markdown.Extra.init(converter, {
                  extensions: "all",
                  highlighter: "prettify"
                });
    
    var editor = new Markdown.Editor(converter);
    editor.run();
  }
});