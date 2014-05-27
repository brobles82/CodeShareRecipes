// Add Recipes pages
// Code From  https://atmosphere.meteor.com/package/sitemaps
var out = [];
var addStaticAdress = function(link) {
  out.push({
    page: link.adress
  , lastmod: new Date().getTime()
  , changefreq: 'monthly'
  , priority: link.priority
  });
};


sitemaps.add('/sitemap.xml', function() {
  var pages = Posts.find().fetch();
  _.each(pages, function(page) {
    out.push({
      page: 'coderecipe/' + page.slug
    , lastmod: new Date().getTime()
    , priority: 0.8
    , changefreq: 'monthly'
    });
  });

  var tags = _.uniq(_.flatten(_.pluck(Posts.find().fetch(), 'tags')));
  _.each(tags, function(page) {
    out.push({
      page: 'coderecipe/tag/' + page
    , lastmod: new Date().getTime()
    , priority: 0.8
    , changefreq: 'monthly'
    });
  });

  var authors = _.uniq(_.flatten(_.pluck(Posts.find().fetch(), 'author')));
  _.each(authors, function(page) {
    out.push({
      page: 'coderecipe/author/' + page
    , lastmod: new Date().getTime()
    , priority: 0.8
    , changefreq: 'monthly'
    });
  });

  //Add Static pages
  addStaticAdress({priority:0.4, adress: 'login'});
  addStaticAdress({priority:0.8, adress: 'coderecipe/top'});
  addStaticAdress({priority:0.8, adress: 'coderecipe/last'});
  addStaticAdress({priority:0.6, adress: 'submit'});
  addStaticAdress({priority:0.4, adress: 'features'});
  addStaticAdress({priority:0.4, adress: 'about'});
  addStaticAdress({priority:1, adress: '/'});
  return out;
});
