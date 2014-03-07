SearchController = FastRender.RouteController.extend({
  template: 'search',
  waitOn: function () {
    Meteor.subscribe('search');
  },
  data: function () {
    return query = this.params.query.split('-');
  },

  after: function() {
    if (!Meteor.isClient) {
      return;
    }
    SEO.set({
      title: 'Search - ' + this.params.query.replace('-', ' ') + ' CodeShareRecipes',
      meta: {
        'description': 'CodeShareRecipe Tutorials, empower your learning, share your knowledge. Best place for share you code ideas and learn from others'
      },
      og: [
        {
          key: 'title',
          value: 'CodeShareRecipes - Code tutorial recipes, empower your learning, share your knowledge'
        },
        {
          key: 'image',
          value: 'http://f.cl.ly/items/1a212k352Q0A0m0n1i1y/Screen%20Shot%202014-02-26%20at%2010.41.26%20AM.png'
        }
      ]
    });
 }
});
