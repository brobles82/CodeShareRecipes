Template.postAuthor.helpers({
  options: function() {
    return {
      sort: {votes: -1, submitted: -1},
      handle: authorHandle
    }
  }
});

Template.postTag.helpers({
  options: function() {
    return {
      sort: {votes: -1, submitted: -1},
      handle: tagHandle
    }
  }
});


Template.newPosts.helpers({
  options: function() {
    return {
      sort: {submitted: -1},
      handle: newPostsHandle
    }
  }
});

Template.bestPosts.helpers({
  options: function() {
    return {  
      sort: {votes: -1, submitted: -1},
      handle: bestPostsHandle
    }
  }
});

Template.postsList.helpers({
  postsWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
    
    if (Session.get('currentPostAuthor')) {
      return Posts.find({author: Session.get('currentPostAuthor')}, options).map(function(post) {
        post._rank = i;
        i += 1;
        return post;
      });
    }

    if (Session.get('currentPostTag')) {
      return Posts.find({tags: Session.get('currentPostTag')}, options).map(function(post) {
        post._rank = i;
        i += 1;
        return post;
      });
    }

    //If not session set
      return Posts.find({}, options).map(function(post) {
        post._rank = i;
        i += 1;
        return post;
      });
    
  },

  postsReady: function() {
    return this.handle.ready();
  },

  allPostsLoaded: function() {
    return this.handle.ready() &&  
      Posts.find().count() < this.handle.loaded();
  },

  //Search Helpers

  searchResults: function() {
    return Spomet.defaultSearch.results();
  },

  searchResultItem: function() {
    var c, p;
    if (this.type !== 'custom') {
      p = Posts.findOne(this.base);
      if (p != null) {
        return p;
      } else {
        return;
      }
    }
  }
});


Template.postsList.try = function() {
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







Template.postsList.events({
  'click .load-more': function(e) {
    e.preventDefault();
    this.handle.loadNextPage();
  }
});

Template.postsList.rendered = function () {
  $("body, html").animate({
    scrollTop: 0
  }, 300);
};
