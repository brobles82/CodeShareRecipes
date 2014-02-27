PostController = FastRender.RouteController.extend({
  template: 'postDetails',
  waitOn: function () {
    return [
      Meteor.subscribe('singePost',this.params.slug),
      Meteor.subscribe('comments', this.params.slug)
    ];

  },
  data: function () {
    return post = Posts.findOne({slug: this.params.slug});
  },

  after: function() {
    var post = Posts.findOne({slug: this.params.slug});

    if (!Meteor.isClient) {
      return;
    }

    SEO.set({
      title: post.title + ' - CodeShareRecipes',
      meta: {
        'description': post.title +  ' - ' + post.message
      },
        og: {
          title: 'CodeShareRecipes',
          'description': 'CodeShareRecipes - Code tutorial recipes, share your knowledge improve your learning'
        }
      });
    }
});
