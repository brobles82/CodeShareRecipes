Template.searchResult.events({
  'click #icoco' : function (e) {
    e.preventDefault();
    Session.set('query', s($('#searchForm').val()));
  }
});

Template.searchResult.rendered = function() {
  s = function(query) {
  searchResults = [];
  var results = [];
  var querySplit = query.split(" ");

  Posts.find().fetch().forEach( function (post) {
    querySplit.forEach(function (word) {
      if(post.title.toLowerCase().indexOf(word.toLowerCase()) !== -1 || post.message.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        results.push(post._id);
        return;
      }
    });
  });

  $.each(results, function(i, el){
    if($.inArray(el, searchResults) === -1)
      searchResults.push(Posts.findOne(el));
  });

  return searchResults;
  };
};

Template.searchResult.searchResult = function() {
  return Session.get('query');
};
