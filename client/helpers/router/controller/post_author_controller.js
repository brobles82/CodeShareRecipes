PostsAuthorController = FastRender.RouteController.extend({
  template: 'postAuthor',
  waitOn: function () {
      Session.set('currentPostAuthor', this.params.author);
    return [
      Meteor.subscribe('authorPosts', this.params.author, 10)
    ];
  },
  data: function () {
    return authorHandle = Meteor.subscribeWithPagination('authorPosts', this.params.author, 10);
  },
  after: function() {
      var author;
      if (!Meteor.isClient) {
        return;
      }
      author = this.params.author;
      SEO.set({
        title: 'written by ' + author + ' - CodeShareRecipes',
        meta: {
          'description': 'Code Recipe tutorials written by ' + author
        },
        og: {
          title: 'CodeShareRecipes',
          'description': 'CodeShareRecipes - Code tutorial recipes, share your knowledge improve your learning'
        }
      });
    }
});
