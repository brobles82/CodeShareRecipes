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

  onAfterAction: function() {   
    if (!Meteor.isClient) {
      return;
    }

    SEO.set({
      title: this.params.slug + ' - CodeShareRecipes',
      meta: {
       'description': this.params.slug
      },
      og: {
        title: 'CodeShareRecipes',
        'description': 'CodeShareRecipes - Code tutorial recipes, share your knowledge improve your learning'
      }
    });
  }
});
