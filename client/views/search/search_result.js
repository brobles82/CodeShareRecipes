//Search algorym
s = function(querySearch) {
  searchResults = [];
  var results = [];

  Posts.find().fetch().forEach( function (post) {
    querySearch.forEach(function (word) {
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

Template.search.searchResult = function() {
  return s(query);
};

Template.search.events({
  'keyup #searchForm' : function (e) {
    if (e.keyCode == 13) {
     if (URLify2($('#searchForm').val()) !== '' ) {
      Router.go('/search/' + URLify2($('#searchForm').val()));
    } else {
      Router.go('/coderecipe/last');
      }
  }
  }
});
