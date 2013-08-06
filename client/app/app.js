/* Helpers*/
window.App = Ember.Application.create({
	 LOG_TRANSITIONS: true
});

Ember.Handlebars.helper('formatBody', function(value) {
  
    var safeConverter = Markdown.getSanitizingConverter();
    
    Markdown.Extra.init(safeConverter, {
                  extensions: "all",
                  highlighter: "prettify"
                });
                
    return safeConverter.makeHtml(value).htmlSafe();
});


Ember.Handlebars.helper('isLoged', function() {
	return false;
});
