PostsTagController = FastRender.RouteController.extend({
  template: 'postTag',
  waitOn: function () {
    return Meteor.subscribe('tagPosts', this.params.tag, 10);
  },

  data: function () {
    return tag = this.params.tag, list='tag', tagHandle = Meteor.subscribeWithPagination('tagPosts', this.params.tag, 10);
  },

  after: function() {
      var author;
      if (!Meteor.isClient) {
        return;
      }
      tag = this.params.tag;
      SEO.set({
        title: 'Listed by tag ' + tag + ' - CodeShareRecipes',
        meta: {
          'description': 'Code Recipe tutorials by tag - ' + tag
        },
        og: {
          title: 'CodeShareRecipes',
          'description': 'CodeShareRecipes - Code tutorial recipes, share your knowledge improve your learning'
        }
      });
    }
});
