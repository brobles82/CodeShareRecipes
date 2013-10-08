Template.search.results = function() {
  return Spomet.defaultSearch.results();
};

Template.result.title = function() {
  var c, p;
  if (this.type !== 'custom') {
    p = Posts.findOne(this.base);
    if (p != null) {
      return p.title;
    } else {
      return;
    }
  }
};

Template.result.message = function() {
  var c, p;
  if (this.type !== 'custom') {
    p = Posts.findOne({
      _id: this.base
    });
    if (p != null) {
      return p.message;
    } else {
      return;
    }
  }
};

Template.result.slug = function() {
  var c, p;
  if (this.type !== 'custom') {
    p = Posts.findOne({
      _id: this.base
    });
    if (p != null) {
      return URLify2(p.title);
    } else {
      return;
    }
  }
};


