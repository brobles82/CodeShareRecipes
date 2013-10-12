Template.searchResult.searchResult = function() {
  var c, p;
  if (this.type !== 'custom') {
    p = Posts.findOne(this.base);
    if (p != null) {
      return p;
    } else {
      return;
    }
  }
};