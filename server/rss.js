serveRSS = function() {
  var feed = new RSS({
    title: getSetting('title'),
    description: getSetting('Description'),
    feed_url: Meteor.absoluteUrl()+'feed.xml',
    site_url: Meteor.absoluteUrl(),
    image_url: Meteor.absoluteUrl()+'img/favicon.png',
  });
  
  Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post) {
    feed.item({
     title: post.title
    });
  });
  
  return feed.xml();
}