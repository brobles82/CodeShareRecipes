Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});


Handlebars.registerHelper('formatBody', function(value) {
  
    var safeConverter = Markdown.getSanitizingConverter();
    
    Markdown.Extra.init(safeConverter, {
                  extensions: "all",
                  highlighter: "prettify"
                });
                
    return safeConverter.makeHtml(value).htmlSafe();
});