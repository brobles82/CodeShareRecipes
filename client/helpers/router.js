Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

var filters = {

  nProgressHook: function () {
    if (this.ready()) {
      NProgress.done(); 
    } else {
      NProgress.start();
     this.stop();
   }
  },

  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      //throwError(i18n.t('Please Sign In First.'))
      this.render('accessDenied');
      this.stop(); 
    }
  },

  isLoggedOut: function() {
    if(Meteor.user()){
      this.render('already_logged_in');
      this.stop();
    }
  }

}

if(Meteor.isClient){
  Router.before(filters.nProgressHook, {except:[]});
  
  //Router.before(filters.isLoggedIn, {only: ['comment_reply','post_submit']});
  Router.before(filters.isLoggedIn, {only: ['postSubmit']});
  //Router.after(filters.resetScroll, {except:['posts_top', 'posts_new', 'posts_best', 'posts_pending', 'posts_category', 'all-users']});
  Router.after(filters.resetScroll, {except:[]});
}

PostsAuthorController = FastRender.RouteController.extend({
  template: 'postAuthor',
  waitOn: function () {
    return [
      // remove Session.get('currentPostAuthor')
      Meteor.subscribe('authorPosts', this.params.author, 10)
    ];
  },
  data: function () {
    return authorHandle = Meteor.subscribeWithPagination('authorPosts', this.params.author, 10);
  }
});

PostsTagController = FastRender.RouteController.extend({
  template: 'postTag',
  waitOn: function () {
    return Meteor.subscribe('tagPosts', this.params.tag, 10);
  },
  
  data: function () {
    return tagHandle = Meteor.subscribeWithPagination('tagPosts', this.params.tag, 10);
  }
});

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
  }
});


Router.map(function() {
  this.route('home', {path: '/', fastRender: true});
  this.route('about', {path: '/about', fastRender: true});
  this.route('features', {path: '/features', fastRender: true});
  this.route('search', {path: '/search', fastRender: true});
  this.route('postSubmit', {path: '/submit', fastRender: true});
  
  this.route('newPosts', {path: '/coderecipe/last', fastRender: true});
  this.route('bestPosts', {path: '/coderecipe/top', fastRender: true});
  
  this.route('postAuthor', {
    path: '/coderecipe/author/:author',
    controller: PostsAuthorController
  });
  
  this.route('postTag', {
    path: '/coderecipe/tag/:tag',
    controller: PostsTagController
  });
  
  this.route('postDetails', {
    path: '/coderecipe/:slug',
    controller: PostController
  });
  
  
  // RSS
  this.route('rss', {
  where: 'server',
  path: '/feed.xml',
  action: function() {
    fastRender: false;
    var feed = new RSS({
      title: "New Microscope Posts",
      description: "The latest posts from Microscope, the smallest news aggregator."
    });
    Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post) {
      feed.item({
        title: post.title
      })
    });
    this.response.write(feed.xml());
    this.response.end();
  }
});

  
});


if(Meteor.isServer) {
  FastRender.onAllRoutes(function() {
    this.subscribe('notifications');
  });
}
