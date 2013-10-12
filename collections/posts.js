Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'message', 'title', 'jsbinlink', 'tags', 'slug','messageHeight').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameTitle = Posts.findOne({title: postAttributes.title});
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    if (!postAttributes.tags)
       throw new Meteor.Error(401, "You need tag your code");
    
    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // ensure the post has a message
    if (!postAttributes.message)
      throw new Meteor.Error(422, 'Please fill in content');
    
    // check that there are no previous posts with the same link
    if (postAttributes.title && postWithSameTitle) {
      throw new Meteor.Error(302, 
        'This Code recipe has already been posted', 
        postWithSameTitle._id);
    }

    var slug = URLify2(postAttributes.title);
    
    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'title', 'tags', 'message', 'jsbinlink','messageHeight'), {
      userId: user._id,
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
      slug: slug,
      upvoters: [], votes: 0
    });
    
    var postId = Posts.insert(post);
    Spomet.add(new Spomet.Findable(post.title, 'title', postId, 'post', new Date().getTime()));
    Spomet.add(new Spomet.Findable(post.message, 'message', postId, 'post', new Date().getTime()));
    
    return postId;
  },
  
  upvote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    Posts.update({
      _id: postId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});