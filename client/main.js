newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);
authorHandle = Meteor.subscribeWithPagination('authorPosts', 10);
tagHandle = Meteor.subscribeWithPagination('tagPosts', 10);
